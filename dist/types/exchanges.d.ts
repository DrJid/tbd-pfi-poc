import { Close, MessageKind, MessageKindClass, Order, OrderStatus, Quote, ExchangesApi, Rfq, GetExchangesFilter } from '@tbdex/http-server';
declare class _ExchangeRepository implements ExchangesApi {
    getExchanges(opts: {
        filter: GetExchangesFilter;
    }): Promise<MessageKindClass[][]>;
    getAllExchanges(): Promise<MessageKindClass[][]>;
    getExchange(opts: {
        id: string;
    }): Promise<MessageKindClass[]>;
    private composeMessages;
    getRfq(opts: {
        exchangeId: string;
    }): Promise<Rfq>;
    getQuote(opts: {
        exchangeId: string;
    }): Promise<Quote>;
    getOrder(opts: {
        exchangeId: string;
    }): Promise<Order>;
    getOrderStatuses(opts: {
        exchangeId: string;
    }): Promise<OrderStatus[]>;
    getClose(opts: {
        exchangeId: string;
    }): Promise<Close>;
    getMessage(opts: {
        exchangeId: string;
        messageKind: MessageKind;
    }): Promise<MessageKindClass>;
    addMessage(opts: {
        message: MessageKindClass;
    }): Promise<void>;
}
export declare const Exchanges: _ExchangeRepository;
export {};
