import dotenv from 'dotenv'
dotenv.config()
import { 
  TbdexHttpServer,
  Rfq, 
  Order, 
  Close, 
} from '@tbdex/http-server'
import { pfiDid } from './util/pfidid.js'
import { Offerings, } from './offerings.js'
import { Exchanges } from './exchanges.js'
import { runNGNSeedOfferings, runSeedOfferings } from './scripts/seed_offering.js';
import { getBTCNGNRates } from './util/chipper.js'

const port = process.env.PORT

const httpApi = new TbdexHttpServer({ 
  exchangesApi: Exchanges, 
  offeringsApi: Offerings,
  pfiDid: pfiDid.did
})

// Middleware to log all API responses
httpApi.api.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Query Params: ${JSON.stringify(req.query)}`);
  next();
});

httpApi.api.get('/', async (req, res) => {
  res.send('Please use the tbdex protocol to communicate with this server or a suitable library: https://github.com/TBD54566975/tbdex-protocol')
})

httpApi.submit('rfq', async (ctx: any, rfq: Rfq) => {
  console.log("Got HTTP RFQ Message", rfq)
  await Exchanges.addMessage({ message: rfq as Rfq })
})

httpApi.submit('order', async (ctx: any, order: Order) => {
  await Exchanges.addMessage({ message: order as Order })
})

httpApi.submit('close', async (ctx: any, close: Close) => {
  await Exchanges.addMessage({ message: close as Close })
})

httpApi.listen(port, () => {
  console.log(`Drjid TBD PFI POC listening on port ${port}`)
  // runSeedOfferings()
  runNGNSeedOfferings()
  // getBTCNGNRates()
})
