import { Offering } from '@tbdex/http-server';
import client from './util/db.js';
import { pfiDid } from './util/pfidid.js';
export class OfferingsRepository {
    async create(offering, pfiDid) {
        const sql = `
        INSERT INTO offerings (offering_id, payin_currency, payout_currency, offering, pfi_did)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
      `;
        const values = [offering.metadata.id, offering.payinCurrency.currencyCode, offering.payoutCurrency.currencyCode, offering, pfiDid];
        const { rows } = await client.query(sql, values);
        console.log(`create offering result: ${JSON.stringify(rows, null, 2)}`);
    }
    async getOffering(opts) {
        console.log("Get Offering with id: ", opts);
        const sql = `
      SELECT * FROM offerings
      WHERE offering_id = $1
      AND pfi_did = $2
    `;
        const values = [opts.id, pfiDid.did];
        const response = await client.query(sql, values);
        const result = response.rows[0];
        if (!result) {
            return undefined;
        }
        console.log("result.offering: ", result.offering);
        const offeringFactory = Offering.factory(result.offering);
        console.log("offeringFactory: ", JSON.stringify(offeringFactory, null, 2));
        return offeringFactory;
    }
    async getOfferings() {
        console.log("** Calling Get Offerings **");
        const sql = `
      SELECT * 
      FROM offerings
      WHERE pfi_did = $1
    `;
        const values = [pfiDid.did];
        const response = await client.query(sql, values);
        const results = response.rows;
        const offerings = [];
        for (let result of results) {
            const offering = Offering.factory(result.offering);
            offerings.push(offering);
        }
        console.log("getOfferings result: ", JSON.stringify(offerings, null, 2));
        return offerings;
    }
}
export const Offerings = new OfferingsRepository();
//# sourceMappingURL=offerings.js.map