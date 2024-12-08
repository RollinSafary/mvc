import Notifier from "../observer/Notifier";

const NAME: string = "Proxy";

export default class Proxy<M> extends Notifier {
    protected proxyName: string;
    private data: M;

    constructor(proxyName: string = NAME, data: M) {
        super();
        this.proxyName = proxyName;
        this.data = data;
    }

    public getProxyName(): string {
        return this.proxyName;
    }

    public onRegister(): void {}

    public onRemove(): void {}

    get vo(): M {
        return this.data;
    }
    set vo(data: M) {
        this.data = data;
    }
}
