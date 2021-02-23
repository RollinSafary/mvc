import SimpleCommand from '../command/SimpleCommand';
import Mediator from '../mediator/Mediator';
import Proxy from '../proxy/Proxy';
export default class Facade {
    static getInstance(key: string): Facade;
    static hasCore(key: string): boolean;
    static removeCore(key: string): void;
    protected static instanceMap: {
        [key: string]: Facade;
    };
    private model;
    private view;
    private controller;
    private multitonKey;
    constructor(key: string);
    initializeFacade(): void;
    registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    registerCommandOnce<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    removeCommands(notificationName: string): void;
    removeCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    hasAnyCommand(notificationName: string): boolean;
    hasCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): boolean;
    registerProxy<M, T extends Proxy<M>>(proxy: T): void;
    retrieveProxy<M, T extends Proxy<M>>(proxyName: string): T;
    removeProxy<M, T extends Proxy<M>>(proxyName: string): T;
    hasProxy(proxyName: string): boolean;
    registerMediator<V, T extends Mediator<V>>(mediator: T): void;
    registerMediators<V, T extends Mediator<V>>(mediators: T[]): void;
    updateMediator<V, T extends Mediator<V>>(mediator: T): void;
    getMediatorIndex<V, T extends Mediator<V>>(mediator: T): number;
    retrieveMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T;
    retrieveMediators<V, T extends Mediator<V>>(mediatorName: string): T[];
    removeMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T;
    removeMediators<V, T extends Mediator<V>>(mediatorAndIdPairs: {
        mediatorName: string;
        id?: number | string;
    }[]): T[];
    hasMediator(mediatorName: string, id: number | string): boolean;
    hasMediatorWithName(mediatorName: string): boolean;
    getMediatorsCount(mediatorName: string): number;
    sendNotification(notificationName: string, ...args: any[]): void;
    notifyObservers(notificationName: string, ...args: any[]): void;
    initializeNotifier(key: string): void;
    protected initializeController(): void;
    protected initializeModel(): void;
    protected initializeView(): void;
}
