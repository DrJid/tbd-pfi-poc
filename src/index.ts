import express from 'express';
import { 
  TbdexHttpServer,
  ExchangesApi, 
  OfferingsApi, 
  Offering,
  Rfq, 
  Order, 
  Close, 
  MessageKindClass, 
  Quote, 
  GetExchangesFilter,
  OrderStatus,
} from '@tbdex/http-server'

const port = process.env.PORT || 5001;

class CustomOfferingsApiProvider implements OfferingsApi {
  async getOffering(opts: {id: string}): Promise<Offering | undefined> {
    console.log("getOffering called with", opts)
    /*
    const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);

    if (!result) {
      return undefined
    }

    return Offering.factory(result.offering)
    */
    return undefined
  }

  async getOfferings(): Promise<Offering[] | undefined> {
    console.log("getOfferings called")
    /*
    const results =  await dataProvider.getOfferings('offering');

    const offerings: Offering[] = []
    for (let result of results) {
      const offering = Offering.factory(result.offering)
      offerings.push(offering)
    }

    return offerings
    */
    return undefined
  }
}

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

const exchangesApiImpl = new CustomExchangeApiProvider()
const offeringsApiImpl = new CustomOfferingsApiProvider()

const httpApi = new TbdexHttpServer({ 
  exchangesApi: exchangesApiImpl, 
  offeringsApi: offeringsApiImpl 
})

httpApi.api.get('/', (req, res) => {
  res.send('Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol')
})

httpApi.submit('rfq', async (ctx: any, rfq: Rfq) => {
  await exchangesApiImpl.write({ message: rfq })
})

httpApi.submit('order', async (ctx: any, order: Order) => {
  await exchangesApiImpl.write({ message: order })
})

httpApi.submit('close', async (ctx: any, close: Close) => {
  await exchangesApiImpl.write({ message: close })
})

httpApi.listen(port, () => {
  console.log(`Mock PFI listening on port ${port}`)
})


