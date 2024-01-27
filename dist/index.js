import { TbdexHttpServer, } from '@tbdex/http-server';
const port = process.env.PORT || 5001;
import { Offerings } from './offerings.js';
import { Exchanges } from './exchanges.js';
import { runSeedOfferings } from './scripts/seed_offering.js';
const httpApi = new TbdexHttpServer({
    exchangesApi: Exchanges,
    offeringsApi: Offerings
});
httpApi.api.get('/', async (req, res) => {
    res.send('Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol');
});
httpApi.submit('rfq', async (ctx, rfq) => {
    console.log("Got RFQ Message", rfq);
    await Exchanges.addMessage({ message: rfq });
});
httpApi.submit('order', async (ctx, order) => {
    await Exchanges.addMessage({ message: order });
});
httpApi.submit('close', async (ctx, close) => {
    await Exchanges.addMessage({ message: close });
});
httpApi.listen(port, () => {
    console.log(`Drjid TBD PFI POC listening on port ${port}`);
    runSeedOfferings();
});
//# sourceMappingURL=index.js.map