import { Close, MessageKind, MessageKindClass, Order, OrderStatus, Quote, ExchangesApi, Rfq, GetExchangesFilter, MessageModel, Offering } from '@tbdex/http-server'
import { Message } from '@tbdex/http-server'
import { pfiDid } from './util/pfidid.js'
import client from './util/db.js'
import { PortableDid } from '@web5/dids'
import { Offerings } from './offerings.js'
import { getBTCNGNRates, getPayout, sendPayout } from './util/chipper.js'
import { createInvoice } from './util/lightning.js'

export class ExchangeRepository implements ExchangesApi {

  async getExchanges(opts: { filter: GetExchangesFilter }): Promise<MessageKindClass[][]> {
    const exchangeIds = opts.filter.id?.length ? opts.filter.id : []

    if (exchangeIds.length === 0) {
      return this.getAllExchanges()
    }

    const exchanges: MessageKindClass[][] = []
    for (let id of exchangeIds) {
      try {
        const exchange = await this.getExchange({ id })
        console.log('exchange', exchange)
        if (exchange.length) exchanges.push(exchange)
        else console.error(`Could not find exchange with exchangeId ${id}`)
      } catch (err) {
        console.error(err)
      }
    }

    return exchanges
  }

  async getAllExchanges(): Promise<MessageKindClass[][]> {
      const sql = `
        SELECT message
        FROM exchanges
        ORDER BY created_at ASC
      `
      const { rows: results } = await client.query(sql)

    return this.composeMessages(results)
  }

  async getExchange(opts: { id: string }): Promise<MessageKindClass[]> {
     const sql = `
      SELECT message
      FROM exchanges
      WHERE exchange_id = $1
      ORDER BY created_at ASC
    `
    const values = [opts.id]
    const { rows: results } = await client.query(sql, values)

    const messages = this.composeMessages(results)

    return messages[0] ?? []
  }

  private composeMessages(results: { message: MessageModel<MessageKind> }[]): MessageKindClass[][] {
    const exchangeIdsToMessages: {[key: string]: MessageKindClass[]} = {}

    for (let result of results) {
      const message = Message.fromJson(result.message)
      const exchangeId = message.exchangeId
      if (exchangeIdsToMessages[exchangeId]) {
        exchangeIdsToMessages[exchangeId].push(message)
      } else {
        exchangeIdsToMessages[exchangeId] = [message]
      }
    }

    return Object.values(exchangeIdsToMessages)
  }

  async getRfq(opts: { exchangeId: string }): Promise<Rfq> {
    return await this.getMessage({ exchangeId: opts.exchangeId, messageKind: 'rfq' }) as Rfq
  }

  async getQuote(opts: { exchangeId: string }): Promise<Quote> {
    return await this.getMessage({ exchangeId: opts.exchangeId, messageKind: 'quote' }) as Quote
  }

  async getOrder(opts: { exchangeId: string }): Promise<Order> {
    return await this.getMessage({ exchangeId: opts.exchangeId, messageKind: 'order' }) as Order
  }

  async getOrderStatuses(opts: { exchangeId: string }): Promise<OrderStatus[]> {
      const sql = `
        SELECT message FROM exchanges
        WHERE exchange_id = $1 AND message_kind = 'orderstatus'
      `
      const values = [opts.exchangeId]
      const { rows: results } = await client.query(sql, values)

    const orderStatuses: OrderStatus[] = []

    for (let result of results) {
      const orderStatus = Message.fromJson(result.message) as OrderStatus
      orderStatuses.push(orderStatus)
    }

    return orderStatuses
  }

  async getClose(opts: { exchangeId: string }): Promise<Close> {
    return await this.getMessage({ exchangeId: opts.exchangeId, messageKind: 'close' }) as Close
  }

  async getMessage(opts: { exchangeId: string, messageKind: MessageKind }) {
      const sql = `
        SELECT message
        FROM exchanges
        WHERE exchange_id = $1 AND message_kind = $2
        LIMIT 1
      `
      const values = [opts.exchangeId, opts.messageKind]
      const { rows: results } = await client.query(sql, values)
      const result = results[0]
      
    if (result) {
      return Message.fromJson(result.message)
    }
  }

  async addMessage(opts: { message: MessageKindClass }) {
    const { message } = opts
    const subject = aliceMessageKinds.has(message.kind) ? message.from : message.to

    const sql = `
      INSERT INTO exchanges (exchange_id, message_kind, message_id, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const values = [message.exchangeId, message.kind, message.id, subject, JSON.stringify(message)]
    const { rows: results } = await client.query(sql, values)
    const result = results[0]

    console.log(`Add ${message.kind} Result: ${JSON.stringify(result, null, 2)}`)

    // This is where we create the Quote based on the RFQ
    // TODO: This is where we also get the real true rate
    // This is where we'd need to call w/e functions to return the correct exchange rates etc.
    if (message.kind === 'rfq') {
      // Create Quote

      const payoutDetails = message.data.payoutMethod
      console.log("Payout Details: ", payoutDetails)

      // Get the offering object - offering_01hn659cjme4p9n2kqvyr8cvf4
      const offering = await Offerings.getOffering({ id: message.offeringId })

      // Expiry Date - 24 hours from now
      const date = new Date();
      date.setHours(date.getHours() + 24);
      const expiresAt = date.toISOString();

      // Generate receive address
      const address = await generateReceiveAddress(message.payinAmount, 'BTC', message)
      const rate = await getBTCNGNRates()
      const payoutAmount = String((Number(message.payinAmount) * Number(rate)).toFixed(2))
      const quote = Quote.create({
        metadata: {
          from: pfiDid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          expiresAt,
          payin: {
            currencyCode: offering.payinCurrency.currencyCode,
            amount: message.payinAmount,
            paymentInstruction: {
              instruction: 'Please pay this lightning invoice',
              link: address
            }
          },
          payout: {
            currencyCode: offering.payoutCurrency.currencyCode,
            amount: payoutAmount,
            paymentInstruction: {
              instruction: JSON.stringify(payoutDetails.paymentDetails)
            }
          }
        }
      })
      await quote.sign(pfiDid as PortableDid)
      this.addMessage({ message: quote as Quote})
    }

    if (message.kind == 'order') {
      // We received the order -- Begin Processing the status
      // Set the initial order state, which is awaiting_funds
      let orderStatus = OrderStatus.create({
        metadata: {
          from: pfiDid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          orderStatus: 'awaiting_funds'
        }
      })
      await orderStatus.sign(pfiDid as PortableDid)
      this.addMessage({ message: orderStatus as OrderStatus})
    }
  }
}

const aliceMessageKinds = new Set(['rfq', 'order'])

export const Exchanges = new ExchangeRepository()


// This is also tied to the quote that we are generating - And we'll want to save these
// values to the DB somewhere
// I'm just trying to get a POC up for now
async function generateReceiveAddress (amount, currency, message: Rfq): Promise<string> {
  const exchangeId = message.metadata.exchangeId
  const satoshiAmount = Math.floor(amount * 100000000);
  const invoice = await createInvoice(satoshiAmount, exchangeId)
  return invoice
}


export async function handleLightningInvoicePaid (invoice) {
  console.log("Lightning Invoice has been paid", invoice)
  const exchangeId = invoice.description
  const quote = await Exchanges.getQuote({ exchangeId })

  await updateStatus(exchangeId, 'funds_received')
  await submitPayout(exchangeId)
  await updateStatus(exchangeId, 'payment_submitted')
  await closeTransaction(exchangeId, quote)
}

async function updateStatus (exchangeId: string, status: string) {
  const quote = await Exchanges.getQuote({ exchangeId })
  
  const orderStatus = OrderStatus.create({
    metadata: {
      from: pfiDid.did,
      to: quote.from,
      exchangeId: quote.exchangeId
    },
    data: {
      orderStatus: status
    }
  })
  await orderStatus.sign(pfiDid as PortableDid)
  await Exchanges.addMessage({ message: orderStatus as OrderStatus})
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function submitPayout (exchangeId: string) {
  const rfq = await Exchanges.getRfq({ exchangeId })
  const quote = await Exchanges.getQuote({ exchangeId })

  const payout = rfq.payoutMethod.paymentDetails

  const tag = payout['tag']
  const reason = payout['reason']
  const amount = Number(quote.data.payout.amount)
  const currency = quote.data.payout.currencyCode
  const reference = exchangeId

  await sendPayout(tag, amount, currency, reference)
  console.log('Will complete payout for quote', JSON.stringify(rfq))

  return { reference, quote }
}

async function closeTransaction (reference: string, quote: Quote) {
  const payout = await getPayout(reference)
  if (payout.status === 'SETTLED') {
    const close = Close.create({
      metadata: {
        from: pfiDid.did,
        to: quote.from,
        exchangeId: quote.exchangeId
      },
      data: {
        reason: 'Order Complete'
      }
    })
    await close.sign(pfiDid as PortableDid)
    await Exchanges.addMessage({ message: close as Close })
  }
}
    
