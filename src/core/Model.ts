import { createErrorForDuplicateKey } from "../common/utils";
import Proxy from "../patterns/proxy/Proxy";

export default class Model {
    public static getInstance(key: string): Model {
        if (!key) {
            return null;
        }

        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new Model(key);
        }

        return this.instanceMap[key];
    }

    public static removeModel(key: string): void {
        delete this.instanceMap[key];
    }
    private static instanceMap: { [key: string]: Model } = {};

    private singletonInstanceKey: string;
    private proxyMap: { [key: string]: Proxy<any> } = {};

    constructor(key: string) {
        if (Model.instanceMap[key]) {
            throw createErrorForDuplicateKey(this.constructor.name, key);
        }
        this.singletonInstanceKey = key;
        this.initializeModel();
    }

    public registerProxy<M, T extends Proxy<M>>(proxy: T): void {
        proxy.initializeNotifier(this.singletonInstanceKey);
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    }

    public retrieveProxy<M, T extends Proxy<M>>(proxyName: string): T {
        return this.proxyMap[proxyName] as T;
    }

    public hasProxy(proxyName: string): boolean {
        return this.proxyMap[proxyName] !== undefined;
    }

    public removeProxy<M, T extends Proxy<M>>(proxyName: string): T {
        if (this.proxyMap[proxyName]) {
            const proxy: T = this.proxyMap[proxyName] as T;
            proxy.onRemove();
            delete this.proxyMap[proxyName];
            return proxy;
        }
        return null;
    }

    protected initializeModel(): void {}
}
