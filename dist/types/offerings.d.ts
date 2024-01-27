import type { OfferingsApi } from '@tbdex/http-server';
import { Offering } from '@tbdex/http-server';
export declare class _Offerings implements OfferingsApi {
    create(offering: Offering): Promise<void>;
    getOffering(opts: {
        id: string;
    }): Promise<Offering>;
    getOfferings(): Promise<Offering[]>;
}
export declare const Offerings: _Offerings;
