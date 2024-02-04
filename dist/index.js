import dotenv from 'dotenv';
dotenv.config();
import { TbdexHttpServer, } from '@tbdex/http-server';
import { pfiDid } from './util/pfidid.js';
import { Offerings, } from './offerings.js';
import { Exchanges } from './exchanges.js';
import { runNGNSeedOfferings } from './scripts/seed_offering.js';
const port = process.env.PORT;
const httpApi = new TbdexHttpServer({
    exchangesApi: Exchanges,
    offeringsApi: Offerings,
    pfiDid: pfiDid.did
});
// Middleware to log all API responses
httpApi.api.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Query Params: ${JSON.stringify(req.query)}`);
    next();
});
httpApi.api.get('/', async (req, res) => {
    res.send('Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol');
});
httpApi.submit('rfq', async (ctx, rfq) => {
    console.log("Got HTTP RFQ Message", rfq);
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
    // runSeedOfferings()
    runNGNSeedOfferings();
    // getBTCNGNRates()
});
//# sourceMappingURL=index.js.map