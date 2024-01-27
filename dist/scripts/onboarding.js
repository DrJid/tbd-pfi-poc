import { DidIonMethod } from '@web5/dids';
const did = await DidIonMethod.create({
    services: [{
            type: 'PFI',
            id: 'pfi',
            serviceEndpoint: 'https://drjid-tbd-pfi-poc-2e4cb9365d06.herokuapp.com'
        }]
});
console.dir(did, { depth: null });
//# sourceMappingURL=onboarding.js.map