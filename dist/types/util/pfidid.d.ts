export declare const pfidid: {
    keySet: {
        verificationMethodKeys: {
            privateKeyJwk: {
                d: string;
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                kid: string;
            };
            publicKeyJwk: {
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                kid: string;
            };
            relationships: string[];
        }[];
        recoveryKey: {
            privateKeyJwk: {
                d: string;
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                y: string;
                kid: string;
            };
            publicKeyJwk: {
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                y: string;
                kid: string;
            };
        };
        updateKey: {
            privateKeyJwk: {
                d: string;
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                y: string;
                kid: string;
            };
            publicKeyJwk: {
                alg: string;
                crv: string;
                kty: string;
                ext: string;
                key_ops: string[];
                x: string;
                y: string;
                kid: string;
            };
        };
    };
    did: string;
    canonicalId: string;
    document: {
        id: string;
        '@context': (string | {
            '@base': string;
        })[];
        service: {
            id: string;
            type: string;
            serviceEndpoint: string;
        }[];
        verificationMethod: {
            id: string;
            controller: string;
            type: string;
            publicKeyJwk: {
                crv: string;
                kty: string;
                x: string;
            };
        }[];
        authentication: string[];
        assertionMethod: string[];
    };
};
