//@ts-ignore
const uuid = require("generate-unique-id");
import Notifier from "../observer/Notifier";

export default abstract class Mediator<V> extends Notifier {
    protected viewComponent: V;
    protected id: number | string;
    protected mediatorName: string;
    protected notificationInterests: string[] = [];
    protected isAwake: boolean = true;

    constructor(mediatorName: string, viewComponent: V) {
        super();
        this.mediatorName = mediatorName || NAME;
        this.viewComponent = viewComponent;
        this.id = uuid({
            length: 6,
            useLetters: false
        });
    }

    public sleep(): void {
        this.isAwake = false;
    }

    public wake(): void {
        this.isAwake = true;
    }

    public getMediatorName(): string {
        return this.mediatorName;
    }

    public getMediatorId(): number | string {
        return this.id;
    }

    public setViewComponent(viewComponent: V): void {
        this.viewComponent = viewComponent;
    }

    public getViewComponent(): V {
        return this.viewComponent;
    }

    public subscribeToNotifications(...notificationNames: string[]): void {
        for (const notificationName of notificationNames) {
            if (this.notificationInterests.indexOf(notificationName) !== -1) {
                console.warn(`${(this.constructor as any).name} subscribes to same notification: ${notificationName}`);
                continue;
            }
            this.notificationInterests.push(notificationName);
        }
        this.updateMediator();
    }

    public subscribeToNotification(notificationName: string): void {
        if (this.notificationInterests.indexOf(notificationName) !== -1) {
            console.warn(`${(this.constructor as any).name} subscribes to same notification: ${notificationName}`);
            return;
        }
        this.notificationInterests.push(notificationName);
        this.updateMediator();
    }

    public unsubscribeToNotification(...notificationNames: string[]): void {
        for (const notificationName of notificationNames) {
            const notificationIndex: number = this.notificationInterests.indexOf(notificationName);
            if (notificationIndex === -1) {
                return;
            }
            this.notificationInterests.splice(notificationIndex, 1);
        }
        this.updateMediator();
    }

    public handleSubscribedNotification(notificationName: string, ...args: any[]): void {
        this.isAwake && this.handleNotification(notificationName, ...args);
    }

    public abstract registerNotificationInterests(): void;

    protected abstract handleNotification(notificationName: string, ...args: any[]): void;

    public onRegister(): void {}

    public onRemove(): void {}

    public setMediatorId(id: number | string): void {
        this.id = id;
    }

    get listNotificationInterests(): string[] {
        return this.notificationInterests;
    }

    protected updateMediator(): void {
        this.facade.updateMediator(this);
    }

    get index(): number {
        return this.facade.getMediatorIndex(this);
    }
}

const NAME: string = "Mediator";
