import type { OfferingsApi } from '@tbdex/http-server'
import { Offering } from '@tbdex/http-server'
import client from './util/db.js'

export class _Offerings implements OfferingsApi {

  async create(offering: Offering) {
      const sql = `
        INSERT INTO offerings (offering_id, payin_currency, payout_currency, offering)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `
      const values = [offering.metadata.id, offering.payinCurrency.currencyCode, offering.payoutCurrency.currencyCode, offering]
      const { rows } = await client.query(sql, values)
      console.log(`create offering result: ${JSON.stringify(rows, null, 2)}`)
  }

  async getOffering(opts: {id: string}): Promise<Offering> {
    console.log("Calling Get Offering with id: ", opts.id)

    const sql = `
      SELECT * FROM offerings
      WHERE offering_id = $1
    `
    const values = [opts.id]
    const response = await client.query(sql, values)
    const result = response.rows[0]

    console.log("getOffering result: ", result)

    if (!result) {
      return undefined
    }

    return Offering.factory(result.offering)

  }

  async getOfferings(): Promise<Offering[]> {
    console.log("Calling Get Offerings")
  
    const sql = `
      SELECT * FROM offerings
    `
    const response = await client.query(sql)
    const results = response.rows
    
    const offerings: Offering[] = []
    for (let result of results) {
      const offering = Offering.factory(result.offering)
      offerings.push(offering)
    }

    console.log("getOfferings result: ", offerings)
    return offerings
  }
}

export const Offerings = new _Offerings()


/*
class CustomOfferingsApiProvider implements OfferingsApi {
  async getOffering(opts: {id: string}): Promise<Offering | undefined> {
    console.log("getOffering called with", opts)

    return undefined
  }


  async getOfferings(): Promise<Offering[] | undefined> {
    console.log("getOfferings called")

    let sql = `
      select * from offerings
    `
    const { rows } = await client.query(sql);
    console.log("All offerings: ", rows)
    return undefined
  }
}
*/
