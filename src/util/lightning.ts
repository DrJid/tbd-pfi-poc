
import * as lnService from 'ln-service'
import { handleLightningInvoicePaid } from '../exchanges.js';

const lnd = lnService.authenticatedLndGrpc({
  macaroon: process.env.LN_MACAROON,
  socket: process.env.LN_SOCKET
}).lnd;

export async function createInvoice (amount, description = ''): Promise<string> {
  try {
    const expiresAt = new Date(Date.now() + 600 * 1000).toISOString();

    const invoice = await lnService.createInvoice({ 
      lnd, 
      tokens: amount, 
      description,
      expiresAt
    })

    console.dir({ invoice }, { depth: null });

    const subscription = await lnService.subscribeToInvoice({ lnd, id: invoice.id })

    subscription.on('invoice_updated', async (invoice) => {
      console.log('Invoice updated:', invoice);
      if (invoice.is_confirmed) {
        await handleLightningInvoicePaid(invoice)
      }
    })
    
    subscription.on('error', (err) => {
      console.error('Error:', err);
    });

    return invoice.request
  } catch (error) {
    console.error('Error getting LND info:', error);
  }
};
