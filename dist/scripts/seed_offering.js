import { Offering } from '@tbdex/http-server';
import { pfidid } from '../util/pfidid.js';
import { Offerings } from '../offerings.js';
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
                id: "7ce4004c-3c38-4853-968b-e411bafcd945",
                input_descriptors: [
                    {
                        "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
                        "constraints": {
                            "fields": [
                                {
                                    "path": [
                                        "$.type"
                                    ],
                                    "filter": {
                                        "type": "string",
                                        "const": "YoloCredential"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
    console.log("Unsigned Offering: ", offering);
    await offering.sign(pfidid);
    console.log("Offering: ", offering);
    await Offerings.create(offering);
    /*
     const offering2 = await Offering.create({
          metadata: { from: pfidid.did },
          data: {
            description: 'First Offering description',
            payinCurrency: {
              currencyCode: 'USD'
            },
            payoutCurrency: {
              currencyCode: 'BTC',
              maxAmount: '999526.11'
            },
            payoutUnitsPerPayinUnit: '0.00003826',
            payinMethods: [
              {
                kind: 'DEBIT_CARD',
                requiredPaymentDetails: {
                  $schema: 'http://json-schema.org/draft-07/schema',
                  type: 'object',
                  properties: {
                    cardNumber: {
                      type: 'string',
                      description: 'The 16-digit debit card number',
                      minLength: 16,
                      maxLength: 16
                    },
                    expiryDate: {
                      type: 'string',
                      description: 'The expiry date of the card in MM/YY format',
                      pattern: '^(0[1-9]|1[0-2])\\/([0-9]{2})$'
                    },
                    cardHolderName: {
                      type: 'string',
                      description: 'Name of the cardholder as it appears on the card'
                    },
                    cvv: {
                      type: 'string',
                      description: 'The 3-digit CVV code',
                      minLength: 3,
                      maxLength: 3
                    }
                  },
                  additionalProperties: false
                }
              }
            ],
            payoutMethods: [
              {
                kind: 'BTC_ADDRESS',
                requiredPaymentDetails: {
                  $schema: 'http://json-schema.org/draft-07/schema',
                  type: 'object',
                  properties: {
                    btcAddress: {
                      type: 'string',
                      description: 'your Bitcoin wallet address'
                    }
                  },
                  required: ['btcAddress'],
                  additionalProperties: false
                }
              }
            ],
            requiredClaims: {
              id: "7ce4004c-3c38-4853-968b-e411bafcd945",
              input_descriptors: [
                {
                  "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
                  "constraints": {
                    "fields": [
                      {
                        "path": [
                          "$.type"
                        ],
                        "filter": {
                          "type": "string",
                          "const": "YoloCredential"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        })
        await offering2.sign(pfidid as PortableDid)
        console.log("Signed offering 2: ", JSON.stringify(offering))
        await Offerings.create(offering2)
        */
}
//# sourceMappingURL=seed_offering.js.map