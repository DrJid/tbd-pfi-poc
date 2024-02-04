import type { OfferingsApi } from '@tbdex/http-server';
import { Offering } from '@tbdex/http-server';
export declare class OfferingsRepository implements OfferingsApi {
    create(offering: Offering, pfiDid: string): Promise<void>;
    getOffering(opts: {
        id: string;
    }): Promise<Offering>;
    getOfferings(): Promise<Offering[]>;
}
export declare const Offerings: OfferingsRepository;
