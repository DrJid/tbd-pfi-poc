import { Close, MessageKind, MessageKindClass, Order, OrderStatus, Quote, ExchangesApi, Rfq, GetExchangesFilter, MessageModel } from '@tbdex/http-server'
import { Message } from '@tbdex/http-server'
import { pfidid } from './util/pfidid.js'
import client from './util/db.js'

class _ExchangeRepository implements ExchangesApi {

  async getExchanges(opts: { filter: GetExchangesFilter }): Promise<MessageKindClass[][]> {
    // TODO: try out GROUP BY! would do it now, just unsure what the return structure looks like
    const exchangeIds = opts.filter.id?.length ? opts.filter.id : []

    if (exchangeIds.length === 0) {
      return this.getAllExchanges()
    }

    const exchanges: MessageKindClass[][] = []
    for (let id of exchangeIds) {
      console.log('calling id', id)
      // TODO: handle error property
      try {
        const exchange = await this.getExchange({ id })
        if (exchange.length) exchanges.push(exchange)
        else console.error(`Could not find exchange with exchangeId ${id}`)
      } catch (err) {
        console.error(err)
      }
    }

    return exchanges
  }

  async getAllExchanges(): Promise<MessageKindClass[][]> {
    /*
    const results = await Postgres.client.selectFrom('exchange')
      .select(['message'])
      .orderBy('createdat', 'asc')
      .execute()
      */

      const sql = `
        SELECT message FROM exchanges
        ORDER BY createdat ASC
      `
      const { rows: results } = await client.query(sql)

    return this.composeMessages(results)
  }

  async getExchange(opts: { id: string }): Promise<MessageKindClass[]> {
    console.log('getting exchange for id', opts.id)

    /*
    const results = await Postgres.client.selectFrom('exchange')
      .select(['message'])
      .where(eb => eb.and({
        exchangeid: opts.id,
      }))
      .orderBy('createdat', 'asc')
      .execute()
      */
     const sql = `
      SELECT message FROM exchanges
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
    /*
    const results = await Postgres.client.selectFrom('exchange')
      .select(['message'])
      .where(eb => eb.and({
        exchangeid: opts.exchangeId,
        messagekind: 'orderstatus'
      }))
      .execute()
      */
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
    /*
    const result = await Postgres.client.selectFrom('exchange')
      .select(['message'])
      .where(eb => eb.and({
        exchangeid: opts.exchangeId,
        messagekind: opts.messageKind
      }))
      .limit(1)
      .executeTakeFirst()
      */
      const sql = `
        SELECT message FROM exchanges
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

    console.log("Add Message: ", message)
    console.log("Add Message Subject: ", subject)

    /*
    const result = await Postgres.client.insertInto('exchange')
      .values({
        exchangeid: message.exchangeId,
        messagekind: message.kind,
        messageid: message.id,
        subject,
        message: JSON.stringify(message)
      })
      .execute()
      */
      const sql = `
        INSERT INTO exchanges (exchange_id, message_kind, message_id, subject, message)
        VALUES ($1, $2, $3, $4, $5)
      `
      const values = [message.exchangeId, message.kind, message.id, subject, JSON.stringify(message)]
      const { rows: results } = await client.query(sql, values)
      const result = results[0]

    console.log(`Add ${message.kind} Result: ${JSON.stringify(result, null, 2)}`)

    if (message.kind == 'rfq') {
      const quote = Quote.create({
        metadata: {
          from: pfidid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          expiresAt: new Date(2024, 4, 1).toISOString(),
          payin: {
            currencyCode: 'BTC',
            amount: '1000.00'
          },
          payout: {
            currencyCode: 'KES',
            amount: '123456789.00'
          }
        }
      })
      await quote.sign(pfidid)
      this.addMessage({ message: quote as Quote})
    }

    if (message.kind == 'order') {
      let orderStatus = OrderStatus.create({
        metadata: {
          from: pfidid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          orderStatus: 'PROCESSING'
        }
      })
      await orderStatus.sign(pfidid)
      this.addMessage({ message: orderStatus as OrderStatus})

      await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay

      orderStatus = OrderStatus.create({
        metadata: {
          from: pfidid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          orderStatus: 'COMPLETED'
        }
      })
      await orderStatus.sign(pfidid)
      this.addMessage({ message: orderStatus as OrderStatus})

      // finally close the exchange
      const close = Close.create({
        metadata: {
          from: pfidid.did,
          to: message.from,
          exchangeId: message.exchangeId
        },
        data: {
          reason: 'Order fulfilled'
        }
      })
      await close.sign(pfidid)
      this.addMessage({ message: close as Close })
    }
  }
}

const aliceMessageKinds = new Set(['rfq', 'order'])

export const Exchanges = new _ExchangeRepository()


/*

class CustomExchangeApiProvider implements ExchangesApi {

  async write({ message }: { message: Rfq | Order | Close }) {
    console.log('write', message);
  }
 
  async getExchanges(opts?: { filter: GetExchangesFilter }): Promise<MessageKindClass[][] | undefined> {
    console.log('getExchanges called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined
  }

  async getExchange(opts: { id: string }): Promise<MessageKindClass[] | undefined> {
    console.log('getExchange called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined
  }

  async getRfq(opts: { exchangeId: string }): Promise<Rfq | undefined> {
    console.log('getRfq called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined
  }

  async getQuote(opts: { exchangeId: string }): Promise<Quote | undefined> {
    console.log('getQuote called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined

  }

  async getOrder(opts: { exchangeId: string }): Promise<Order | undefined> {
    console.log('getOrder called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined

  }

  async getOrderStatuses(opts: { exchangeId: string }): Promise<OrderStatus[] | undefined> {
    console.log('getOrderStatuses called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined

  }

  async getClose(opts: { exchangeId: string }): Promise<Close | undefined> {
    console.log('getClose called with', opts);
    // Implement your logic here and return the appropriate value
    return undefined

  }
}
*/
