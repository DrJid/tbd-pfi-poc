import { PortableDid } from "@web5/dids";

export const pfidid: PortableDid = {
  keySet: {
    verificationMethodKeys: [
      {
        privateKeyJwk: {
          d: 'H8-Hil7GD7pGF5XvpgOAtws_tBxG6gVFeCIQ4j0Ef4k',
          alg: 'EdDSA',
          crv: 'Ed25519',
          kty: 'OKP',
          ext: 'true',
          key_ops: [ 'sign' ],
          x: '_7L0uxfEMgzK3Ivza2VvCaNWErzDSm-_-0_8eebhHBI',
          kid: 'dwn-sig'
        },
        publicKeyJwk: {
          alg: 'EdDSA',
          crv: 'Ed25519',
          kty: 'OKP',
          ext: 'true',
          key_ops: [ 'verify' ],
          x: '_7L0uxfEMgzK3Ivza2VvCaNWErzDSm-_-0_8eebhHBI',
          kid: 'dwn-sig'
        },
        relationships: [ 'authentication', 'assertionMethod' ]
      }
    ],
    recoveryKey: {
      privateKeyJwk: {
        d: '1lUXX8MOr7PKGSdsbQNQtTDkNs_2ZEiZGcWpuMAjzLE',
        alg: 'ES256K',
        crv: 'secp256k1',
        kty: 'EC',
        ext: 'true',
        key_ops: [ 'sign' ],
        x: 'qvUGQ92CLvIj1Fj7R9O41NYJMDUCtWeetvAbiXvw0dk',
        y: 'GEN3HNMT8imWTrAnItz633X91hM4BFxafi69pzOKV0s',
        kid: 'ion-recovery-1'
      },
      publicKeyJwk: {
        alg: 'ES256K',
        crv: 'secp256k1',
        kty: 'EC',
        ext: 'true',
        key_ops: [ 'verify' ],
        x: 'qvUGQ92CLvIj1Fj7R9O41NYJMDUCtWeetvAbiXvw0dk',
        y: 'GEN3HNMT8imWTrAnItz633X91hM4BFxafi69pzOKV0s',
        kid: 'ion-recovery-1'
      }
    },
    updateKey: {
      privateKeyJwk: {
        d: 'Pzo9H2fs0CLV7DcGD33x4shlEEk7fZIzs8YlMmzTzcI',
        alg: 'ES256K',
        crv: 'secp256k1',
        kty: 'EC',
        ext: 'true',
        key_ops: [ 'sign' ],
        x: 'Un-_kPCUB0ynKt1ylWydFqJAWEYktutYYaX3yVP8LIY',
        y: 'lTcXCIw3oLAPrS8pLNlq0kOXGw8lKyQM2OysuB0Yt3k',
        kid: 'ion-update-1'
      },
      publicKeyJwk: {
        alg: 'ES256K',
        crv: 'secp256k1',
        kty: 'EC',
        ext: 'true',
        key_ops: [ 'verify' ],
        x: 'Un-_kPCUB0ynKt1ylWydFqJAWEYktutYYaX3yVP8LIY',
        y: 'lTcXCIw3oLAPrS8pLNlq0kOXGw8lKyQM2OysuB0Yt3k',
        kid: 'ion-update-1'
      }
    }
  },
  did: 'did:ion:EiDD2gFBA2wxxKuhJb3PXdYcFr7ze0M8vUcWCUHXqzcwnw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiXzdMMHV4ZkVNZ3pLM0l2emEyVnZDYU5XRXJ6RFNtLV8tMF84ZWViaEhCSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifV0sInNlcnZpY2VzIjpbeyJpZCI6InBmaSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vZHJqaWQtdGJkLXBmaS1wb2MtMmU0Y2I5MzY1ZDA2Lmhlcm9rdWFwcC5jb20iLCJ0eXBlIjoiUEZJIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBNlhqVjFaaDBMZXVJdlR5S0tvZXJnTzFodEtoamVFQzRvcTZPbHFfU2NmQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHFGY0JWUGI3cWRqQ204YzJmZThWNGpXWXpEYnk5RlUydFBPZ1NlQ1o1S3ciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNFcC1lckJOY0ktdjJGbnpKTVJnVjZKcHk1bHM1a1kyb215dDJPN0g0a213In19',
  canonicalId: 'did:ion:EiDD2gFBA2wxxKuhJb3PXdYcFr7ze0M8vUcWCUHXqzcwnw',
  document: {
    id: 'did:ion:EiDD2gFBA2wxxKuhJb3PXdYcFr7ze0M8vUcWCUHXqzcwnw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiXzdMMHV4ZkVNZ3pLM0l2emEyVnZDYU5XRXJ6RFNtLV8tMF84ZWViaEhCSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifV0sInNlcnZpY2VzIjpbeyJpZCI6InBmaSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vZHJqaWQtdGJkLXBmaS1wb2MtMmU0Y2I5MzY1ZDA2Lmhlcm9rdWFwcC5jb20iLCJ0eXBlIjoiUEZJIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBNlhqVjFaaDBMZXVJdlR5S0tvZXJnTzFodEtoamVFQzRvcTZPbHFfU2NmQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHFGY0JWUGI3cWRqQ204YzJmZThWNGpXWXpEYnk5RlUydFBPZ1NlQ1o1S3ciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNFcC1lckJOY0ktdjJGbnpKTVJnVjZKcHk1bHM1a1kyb215dDJPN0g0a213In19',
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'did:ion:EiDD2gFBA2wxxKuhJb3PXdYcFr7ze0M8vUcWCUHXqzcwnw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiXzdMMHV4ZkVNZ3pLM0l2emEyVnZDYU5XRXJ6RFNtLV8tMF84ZWViaEhCSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifV0sInNlcnZpY2VzIjpbeyJpZCI6InBmaSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vZHJqaWQtdGJkLXBmaS1wb2MtMmU0Y2I5MzY1ZDA2Lmhlcm9rdWFwcC5jb20iLCJ0eXBlIjoiUEZJIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBNlhqVjFaaDBMZXVJdlR5S0tvZXJnTzFodEtoamVFQzRvcTZPbHFfU2NmQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHFGY0JWUGI3cWRqQ204YzJmZThWNGpXWXpEYnk5RlUydFBPZ1NlQ1o1S3ciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNFcC1lckJOY0ktdjJGbnpKTVJnVjZKcHk1bHM1a1kyb215dDJPN0g0a213In19'
    ],
    service: [
      {
        id: '#pfi',
        type: 'PFI',
        serviceEndpoint: 'https://drjid-tbd-pfi-poc-2e4cb9365d06.herokuapp.com'
      }
    ],
    verificationMethod: [
      {
        id: '#dwn-sig',
        controller: 'did:ion:EiDD2gFBA2wxxKuhJb3PXdYcFr7ze0M8vUcWCUHXqzcwnw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiXzdMMHV4ZkVNZ3pLM0l2emEyVnZDYU5XRXJ6RFNtLV8tMF84ZWViaEhCSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiIsImFzc2VydGlvbk1ldGhvZCJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifV0sInNlcnZpY2VzIjpbeyJpZCI6InBmaSIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vZHJqaWQtdGJkLXBmaS1wb2MtMmU0Y2I5MzY1ZDA2Lmhlcm9rdWFwcC5jb20iLCJ0eXBlIjoiUEZJIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBNlhqVjFaaDBMZXVJdlR5S0tvZXJnTzFodEtoamVFQzRvcTZPbHFfU2NmQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHFGY0JWUGI3cWRqQ204YzJmZThWNGpXWXpEYnk5RlUydFBPZ1NlQ1o1S3ciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNFcC1lckJOY0ktdjJGbnpKTVJnVjZKcHk1bHM1a1kyb215dDJPN0g0a213In19',
        type: 'JsonWebKey2020',
        publicKeyJwk: {
          crv: 'Ed25519',
          kty: 'OKP',
          x: '_7L0uxfEMgzK3Ivza2VvCaNWErzDSm-_-0_8eebhHBI'
        }
      }
    ],
    authentication: [ '#dwn-sig' ],
    assertionMethod: [ '#dwn-sig' ]
  }
}
