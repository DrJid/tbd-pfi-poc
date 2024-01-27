import { TbdexHttpServer, } from '@tbdex/http-server';
const port = process.env.PORT || 5001;
class CustomOfferingsApiProvider {
    async getOffering(opts) {
        console.log("getOffering called with", opts);
        /*
        const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);
    
        if (!result) {
          return undefined
        }
    
        return Offering.factory(result.offering)
        */
        return undefined;
    }
    async getOfferings() {
        console.log("getOfferings called");
        /*
        const results =  await dataProvider.getOfferings('offering');
    
        const offerings: Offering[] = []
        for (let result of results) {
          const offering = Offering.factory(result.offering)
          offerings.push(offering)
        }
    
        return offerings
        */
        return undefined;
    }
}
class CustomExchangeApiProvider {
    async write({ message }) {
        console.log('write', message);
    }
    async getExchanges(opts) {
        console.log('getExchanges called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getExchange(opts) {
        console.log('getExchange called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getRfq(opts) {
        console.log('getRfq called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getQuote(opts) {
        console.log('getQuote called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getOrder(opts) {
        console.log('getOrder called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getOrderStatuses(opts) {
        console.log('getOrderStatuses called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
    async getClose(opts) {
        console.log('getClose called with', opts);
        // Implement your logic here and return the appropriate value
        return undefined;
    }
}
const exchangesApiImpl = new CustomExchangeApiProvider();
const offeringsApiImpl = new CustomOfferingsApiProvider();
const httpApi = new TbdexHttpServer({
    exchangesApi: exchangesApiImpl,
    offeringsApi: offeringsApiImpl
});
httpApi.api.get('/', (req, res) => {
    res.send('Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol');
});
httpApi.submit('rfq', async (ctx, rfq) => {
    await exchangesApiImpl.write({ message: rfq });
});
httpApi.submit('order', async (ctx, order) => {
    await exchangesApiImpl.write({ message: order });
});
httpApi.submit('close', async (ctx, close) => {
    await exchangesApiImpl.write({ message: close });
});
console.log(`Will open Mock PFI listening on port ${port}`);
httpApi.listen(port, () => {
    console.log(`Mock PFI listening on port ${port}`);
});
//# sourceMappingURL=index.js.map