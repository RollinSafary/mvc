import Notifier from '../observer/Notifier';
export default abstract class Mediator<V> extends Notifier {
    protected viewComponent: V;
    protected id: number | string;
    protected mediatorName: string;
    protected notificationInterests: string[];
    protected isAwake: boolean;
    constructor(mediatorName: string, viewComponent: V);
    sleep(): void;
    wake(): void;
    getMediatorName(): string;
    getMediatorId(): number | string;
    setViewComponent(viewComponent: V): void;
    getViewComponent(): V;
    subscribeToNotifications(...notificationNames: string[]): void;
    subscribeToNotification(notificationName: string): void;
    unsubscribeToNotification(...notificationNames: string[]): void;
    handleSubscribedNotification(notificationName: string, ...args: any[]): void;
    abstract registerNotificationInterests(): void;
    protected abstract handleNotification(notificationName: string, ...args: any[]): void;
    onRegister(): void;
    onRemove(): void;
    setMediatorId(id: number | string): void;
    readonly listNotificationInterests: string[];
    protected updateMediator(): void;
    readonly index: number;
}
