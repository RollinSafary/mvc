import { EventEmitter } from "eventemitter3";
import Mediator from "../patterns/mediator/Mediator";

export default class View {
    public static getInstance(key: string): View {
        if (!key) {
            return null;
        }

        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new View(key);
        }

        return this.instanceMap[key];
    }

    public static removeView(key: string): void {
        delete this.instanceMap[key];
    }

    private static instanceMap: { [key: string]: View } = {};

    private multitonKey: string;
    private mediatorMap: IMediatorMap = {};
    // @ts-ignore
    private eventEmitter: EventEmitter = new EventEmitter();

    constructor(key: string) {
        if (View.instanceMap[key]) {
            throw new Error(MULTITON_MSG);
        }
        this.multitonKey = key;
        this.initializeView();
    }

    public removeObserver(
        notificationName: string,
        observerMethod: (notificationName: string, ...args: any[]) => void,
        context: any
    ): void {
        this.eventEmitter.off(notificationName, observerMethod, context);
    }

    public registerObserver(
        notificationName: string,
        observerMethod: (notificationName: string, ...args: any[]) => void,
        context: any
    ): void {
        this.eventEmitter.on(notificationName, observerMethod, context);
    }

    public notifyObservers(notificationName: string, ...args: any[]): void {
        this.eventEmitter.emit(notificationName, notificationName, ...args);
    }

    public registerMediator<V>(mediator: Mediator<V>): void {
        if (this.hasMediator(mediator.getMediatorName(), mediator.getMediatorId())) {
            return;
        }

        mediator.initializeNotifier(this.multitonKey);
        mediator.registerNotificationInterests();
        // register the mediator for retrieval by name
        if (!this.mediatorMap[mediator.getMediatorName()]) {
            this.mediatorMap[mediator.getMediatorName()] = [];
        }
        this.mediatorMap[mediator.getMediatorName()].push({
            mediator,
            interests: [...mediator.listNotificationInterests],
            id: mediator.getMediatorId()
        });

        // get notification interests if any
        const interests: string[] = this.mediatorMap[mediator.getMediatorName()][0].interests;

        // register mediator as an observer for each notification
        if (interests.length > 0) {
            for (const interest of interests) {
                this.registerObserver(interest, mediator.handleSubscribedNotification, mediator);
            }
        }

        mediator.onRegister();
    }

    public updateMediator<V>(mediator: Mediator<V>): void {
        if (!this.hasMediator(mediator.getMediatorName(), mediator.getMediatorId())) {
            return;
        }
        const mediators: IMediatorMapElement[] = this.mediatorMap[mediator.getMediatorName()];
        const targetElement: IMediatorMapElement = mediators.filter((element: IMediatorMapElement) => {
            return element.id === mediator.getMediatorId();
        })[0];
        const registeredInterests: string[] = targetElement.interests;
        const newInterests: string[] = mediator.listNotificationInterests;
        for (const interest of registeredInterests) {
            // interest
            this.removeObserver(interest, mediator.handleSubscribedNotification, mediator);
        }
        for (const interest of newInterests) {
            this.registerObserver(interest, mediator.handleSubscribedNotification, mediator);
        }
        targetElement.interests = [...newInterests];
    }

    public retrieveMediator<V, T extends Mediator<V>>(mediatorName: string, id?: number | string): T {
        const mediators: IMediatorMapElement[] = this.mediatorMap[mediatorName] as IMediatorMapElement[];
        if (!!mediators && mediators.length) {
            return id
                ? (mediators.filter((element: IMediatorMapElement) => element.id === id)[0].mediator as T)
                : (mediators[0].mediator as T);
        } else {
            return null;
        }
    }

    public retrieveMediators<V, T extends Mediator<V>>(mediatorName: string): T[] {
        return this.mediatorMap[mediatorName].map((element: IMediatorMapElement) => element.mediator as T);
    }

    public removeMediator<V, T extends Mediator<V>>(mediatorName: string, id: number | string): T {
        if (!this.mediatorMap[mediatorName]) {
            return null;
        }
        const mediators: IMediatorMapElement[] = this.mediatorMap[mediatorName];
        const targetElement: IMediatorMapElement = id
            ? mediators.filter((element: IMediatorMapElement) => {
                  return element.id === id;
              })[0]
            : this.mediatorMap[mediatorName][0];
        if (!targetElement) {
            return null;
        }
        // for every notification the mediator is interested in...
        const interests: string[] = targetElement.interests;
        for (const interest of interests) {
            // interest
            this.removeObserver(interest, targetElement.mediator.handleSubscribedNotification, targetElement.mediator);
        }
        // remove the mediator from the map
        const index: number = this.mediatorMap[mediatorName].indexOf(targetElement);
        if (index !== -1) {
            this.mediatorMap[mediatorName].splice(index, 1);
        }
        if (this.mediatorMap[mediatorName].length === 0) {
            delete this.mediatorMap[mediatorName];
        }

        // alert the mediator that it has been removed
        targetElement.mediator.onRemove();
        return targetElement.mediator as T;
    }

    public hasMediator(mediatorName: string, id?: number | string): boolean {
        return this.mediatorMap[mediatorName]
            ? id
                ? this.mediatorMap[mediatorName].filter((el: IMediatorMapElement) => el.id === id).length > 0
                : this.mediatorMap[mediatorName].length > 0
            : false;
    }

    protected initializeView(): void {}

    public getMediatorsCount(mediatorName: string): number {
        return this.mediatorMap[mediatorName] ? this.mediatorMap[mediatorName].length : 0;
    }

    public getMediatorIndex<V>(mediator: Mediator<V>): number {
        const mediatorMapElements: IMediatorMapElement[] = this.mediatorMap[mediator.getMediatorName()];
        const mapElement: IMediatorMapElement = mediatorMapElements.filter((el: IMediatorMapElement) => el.mediator === mediator)[0];
        return mediatorMapElements.indexOf(mapElement);
    }
}

const MULTITON_MSG: string = "View instance for this Multiton key already constructed!";

export interface IMediatorMapElement {
    mediator: Mediator<any>;
    interests: string[];
    id: number | string;
}

export interface IMediatorMap {
    [key: string]: IMediatorMapElement[];
}
