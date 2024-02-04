export declare function getMe(): Promise<void>;
export declare function getBTCNGNRates(): Promise<number>;
export declare function getExchangeRate(from: string, to: string): Promise<any>;
export declare function getPayout(reference: string): Promise<any>;
export declare function sendPayout(tag: string, amount: number, currency: string, reference: string): Promise<void>;
