import Mediator from '../patterns/mediator/Mediator';
export default class View {
    static getInstance(key: string): View;
    static removeView(key: string): void;
    private static instanceMap;
    private multitonKey;
    private mediatorMap;
    private eventEmitter;
    constructor(key: string);
    removeObserver(notificationName: string, observerMethod: (notificationName: string, ...args: any[]) => void, context: any): void;
    registerObserver(notificationName: string, observerMethod: (notificationName: string, ...args: any[]) => void, context: any): void;
    notifyObservers(notificationName: string, ...args: any[]): void;
    registerMediator<V>(mediator: Mediator<V>): void;
    updateMediator<V>(mediator: Mediator<V>): void;
    retrieveMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T;
    retrieveMediators<V, T extends Mediator<V>>(mediatorName: string): T[];
    removeMediator<V, T extends Mediator<V>>(mediatorName: string, id: number | string): T;
    hasMediator(mediatorName: string, id?: number | string): boolean;
    protected initializeView(): void;
    getMediatorsCount(mediatorName: string): number;
    getMediatorIndex<V>(mediator: Mediator<V>): number;
}
export interface IMediatorMapElement {
    mediator: Mediator<any>;
    interests: string[];
    id: number | string;
}
export interface IMediatorMap {
    [key: string]: IMediatorMapElement[];
}
