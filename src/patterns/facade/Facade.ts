import { FunctionArgs } from "../../common/general";
import { createErrorForDuplicateKey } from "../../common/utils";
import Controller from "../../core/Controller";
import Model from "../../core/Model";
import View from "../../core/View";
import SimpleCommand from "../command/SimpleCommand";
import Mediator from "../mediator/Mediator";
import Proxy from "../proxy/Proxy";

export default class Facade {
    public static getInstance(key: string): Facade {
        if (!key) {
            return null;
        }

        if (!Facade.instanceMap[key]) {
            Facade.instanceMap[key] = new Facade(key);
        }

        return Facade.instanceMap[key];
    }

    public static hasCore(key: string): boolean {
        return this.instanceMap[key] !== undefined;
    }

    public static removeCore(key: string): void {
        if (!this.instanceMap[key]) {
            return;
        }
        Model.removeModel(key);
        View.removeView(key);
        Controller.removeController(key);
        delete this.instanceMap[key];
    }
    protected static instanceMap: { [key: string]: Facade } = {};

    private model: Model;
    private view: View;
    private controller: Controller;
    private singletonInstanceKey: string;

    constructor(key: string) {
        if (Facade.instanceMap[key]) {
            throw createErrorForDuplicateKey(this.constructor.name, key);
        }
        this.initializeNotifier(key);
        this.initializeFacade();
    }

    public initializeFacade(): void {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }

    public registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void {
        this.controller.registerCommand<T>(notificationName, commandClassRef);
    }
    public registerCommandOnce<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void {
        this.controller.registerCommandOnce<T>(notificationName, commandClassRef);
    }

    public removeCommands(notificationName: string): void {
        this.controller.removeCommands(notificationName);
    }
    public removeCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void {
        this.controller.removeCommand(notificationName, commandClassRef);
    }

    public hasAnyCommand(notificationName: string): boolean {
        return this.controller.hasAnyCommand(notificationName);
    }
    public hasCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): boolean {
        return this.controller.hasCommand(notificationName, commandClassRef);
    }

    public registerProxy<M, T extends Proxy<M>>(proxy: T): void {
        this.model.registerProxy<M, T>(proxy);
    }

    public retrieveProxy<M, T extends Proxy<M>>(proxyName: string): T {
        return this.model.retrieveProxy(proxyName);
    }

    public removeProxy<M, T extends Proxy<M>>(proxyName: string): T {
        if (this.model) {
            return this.model.removeProxy(proxyName);
        }
        return null;
    }

    public hasProxy(proxyName: string): boolean {
        return this.model.hasProxy(proxyName);
    }

    public registerMediator<V, T extends Mediator<V>>(mediator: T): void {
        this.view.registerMediator(mediator);
    }

    public registerMediators<V, T extends Mediator<V>>(mediators: T[]): void {
        for (const mediator of mediators) {
            this.view.registerMediator(mediator);
        }
    }

    public updateMediator<V, T extends Mediator<V>>(mediator: T): void {
        this.view.updateMediator(mediator);
    }
    public getMediatorIndex<V, T extends Mediator<V>>(mediator: T): number {
        return this.view.getMediatorIndex(mediator);
    }

    public retrieveMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T {
        return this.view.retrieveMediator(mediatorName, id);
    }
    public retrieveMediators<V, T extends Mediator<V>>(mediatorName: string): T[] {
        return this.view.retrieveMediators(mediatorName);
    }

    public removeMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T {
        return this.view.removeMediator(mediatorName, id);
    }

    public removeMediators<V, T extends Mediator<V>>(mediatorAndIdPairs: { mediatorName: string; id?: number | string }[]): T[] {
        const removedMediators: T[] = [];
        for (const pair of mediatorAndIdPairs) {
            removedMediators.push(this.view.removeMediator(pair.mediatorName, pair.id));
        }
        return removedMediators;
    }

    public hasMediator(mediatorName: string, id: number | string): boolean {
        return this.view.hasMediator(mediatorName, id);
    }
    public hasMediatorWithName(mediatorName: string): boolean {
        return this.view.hasMediator(mediatorName);
    }

    public getMediatorsCount(mediatorName: string): number {
        return this.view.getMediatorsCount(mediatorName);
    }

    public sendNotification<A extends FunctionArgs>(notificationName: string, ...args: A): void {
        this.notifyObservers(notificationName, ...args);
    }

    public notifyObservers<A extends FunctionArgs>(notificationName: string, ...args: A): void {
        this.view.notifyObservers(notificationName, ...args);
    }

    public initializeNotifier(key: string): void {
        this.singletonInstanceKey = key;
    }
    protected initializeController(): void {
        if (this.controller) {
            return;
        }
        this.controller = Controller.getInstance(this.singletonInstanceKey);
    }

    protected initializeModel(): void {
        if (this.model) {
            return;
        }
        this.model = Model.getInstance(this.singletonInstanceKey);
    }

    protected initializeView(): void {
        if (this.view) {
            return;
        }
        this.view = View.getInstance(this.singletonInstanceKey);
    }
}
