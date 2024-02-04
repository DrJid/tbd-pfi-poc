import { Offering } from '@tbdex/http-server';
import { pfiDid } from '../util/pfidid.js';
import { Offerings } from '../offerings.js';
export async function runSeedOfferings() {
    const offering = Offering.create({
        metadata: { from: pfiDid.did },
        data: {
            description: 'BTC -> UGX',
            payoutUnitsPerPayinUnit: '159517928.60',
            payinCurrency: { currencyCode: 'BTC' },
            payoutCurrency: { currencyCode: 'UGX' },
            payinMethods: [{
                    kind: 'BTC_LIGHTNING',
                    requiredPaymentDetails: {
                        $schema: 'http://json-schema.org/draft-07/schema',
                        type: 'object',
                        properties: {
                            address: {
                                type: 'string',
                                description: 'Your Bitcoin Lightning address'
                            }
                        },
                        required: ['address'],
                        additionalProperties: false
                    }
                }],
            payoutMethods: [
                {
                    kind: 'MOMO_MTN_UGANDA',
                    requiredPaymentDetails: {
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        title: 'Mobile Money Required Payment Details',
                        type: 'object',
                        required: [
                            'phoneNumber',
                            'reason'
                        ],
                        additionalProperties: false,
                        properties: {
                            phoneNumber: {
                                title: 'Mobile money phone number',
                                description: 'Phone number of the Mobile Money account',
                                type: 'string'
                            },
                            reason: {
                                title: 'Reason for sending',
                                description: 'To abide by financial reporting requirements, the reason for sending money',
                                type: 'string'
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
                                'description': 'To abide by financial reporting requirements, the reason for sending money',
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
    await offering.sign(pfiDid);
    console.log("Offering: ", JSON.stringify(offering));
    await Offerings.create(offering, pfiDid.did);
}
export async function runNGNSeedOfferings() {
    const offering = Offering.create({
        metadata: { from: pfiDid.did },
        data: {
            description: 'BTC -> NGN',
            payoutUnitsPerPayinUnit: '60794780.47',
            payinCurrency: { currencyCode: 'BTC' },
            payoutCurrency: { currencyCode: 'NGN' },
            payinMethods: [{
                    kind: 'BTC_LIGHTNING',
                    requiredPaymentDetails: {
                        $schema: 'http://json-schema.org/draft-07/schema',
                        type: 'object',
                        properties: {
                            address: {
                                type: 'string',
                                description: 'Your Bitcoin Lightning address'
                            }
                        },
                        required: ['address'],
                        additionalProperties: false
                    }
                }],
            payoutMethods: [
                {
                    kind: 'CHIPPER_CASH',
                    requiredPaymentDetails: {
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        title: 'Chipper Cash Required Payment Details',
                        type: 'object',
                        required: [
                            'tag',
                            'reason'
                        ],
                        additionalProperties: false,
                        properties: {
                            tag: {
                                title: 'Chipper Tag',
                                description: 'Chipper Tag of the recipient',
                                type: 'string'
                            },
                            reason: {
                                title: 'Reason for sending',
                                description: 'To abide by financial reporting requirements, the reason for sending money',
                                type: 'string'
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
                                'description': 'To abide by financial reporting requirements, the reason for sending money',
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
    await offering.sign(pfiDid);
    console.log("Offering: ", JSON.stringify(offering));
    await Offerings.create(offering, pfiDid.did);
}
//# sourceMappingURL=seed_offering.js.map