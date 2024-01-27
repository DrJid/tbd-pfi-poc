import { Offering } from '@tbdex/http-server'
import { pfidid }  from '../util/pfidid.js'
import { Offerings } from '../offerings.js'

export async function runSeedOfferings() {
  const offering = Offering.create({
    metadata: { from: pfidid.did },
    data: {
      description: 'BTC -> USD',
      payoutUnitsPerPayinUnit: '159517928.60', // ex. we send 100 dollars, so that means 14550.00 KES
      payinCurrency: { currencyCode: 'BTC' },
      payoutCurrency: { currencyCode: 'UGX' },
      payinMethods: [{
        kind: 'BTC_LIGHTNING',
        requiredPaymentDetails: {}
      }],
      payoutMethods: [
        {
          kind: 'MOMO_MTN_UGANDA',
          requiredPaymentDetails: {
            '$schema': 'http://json-schema.org/draft-07/schema#',
            'title': 'Mobile Money Required Payment Details',
            'type': 'object',
            'required': [
              'phoneNumber',
              'reason'
            ],
            'additionalProperties': false,
            'properties': {
              'phoneNumber': {
                'title': 'Mobile money phone number',
                'description': 'Phone number of the Mobile Money account',
                'type': 'string'
              },
              'reason': {
                'title': 'Reason for sending',
                'description': 'To abide by the travel rules and financial reporting requirements, the reason for sending money',
                'type': 'string'
              }
            }
          }
        },
        {
          kind: 'BANK_FIRSTBANK',
          requiredPaymentDetails: {
            '$schema': 'http://json-schema.org/draft-07/schema#',
            'title': 'Bank Transfer Required Payment Details',
            'type': 'object',
            'required': [
              'accountNumber',
              'reason'
            ],
            'additionalProperties': false,
            'properties': {
              'accountNumber': {
                'title': 'Bank account number',
                'description': 'Bank account of the recipient\'s bank account',
                'type': 'string'
              },
              'reason': {
                'title': 'Reason for sending',
                'description': 'To abide by the travel rules and financial reporting requirements, the reason for sending money',
                'type': 'string'
              }
            }
          }
        }
      ],
      requiredClaims: {
        id: '7ce4004c-3c38-4853-968b-e411bafcd945',
        input_descriptors: [{
          id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
          constraints: {
            fields: [
              {
                path: ['$.type[*]'],
                filter: {
                  type: 'string',
                  pattern: '^SanctionCredential$'
                }
              }
            ]
          }
        }]
      }
    }
  })
  console.log("Unsigned Offering: ", offering)
  await offering.sign(pfidid)
  console.log("Offering: ", offering)
  await Offerings.create(offering)
}
