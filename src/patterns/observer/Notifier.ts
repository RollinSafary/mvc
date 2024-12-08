import { FunctionArgs } from "../../common/general";
import { createErrorForNotInitialized } from "../../common/utils";
import Facade from "../facade/Facade";

export default class Notifier {
    protected facade: Facade;
    protected singletonInstanceKey: string;

    public initializeNotifier(key: string): void {
        this.singletonInstanceKey = key;
        this.facade = this.getFacade();
    }

    protected sendNotification<A extends FunctionArgs>(notificationName: string, ...args: A): void {
        if (this.facade) {
            this.facade.sendNotification(notificationName, ...args);
        }
    }

    private getFacade(): Facade {
        if (this.singletonInstanceKey === null) {
            throw createErrorForNotInitialized(this.constructor.name);
        }

        return Facade.getInstance(this.singletonInstanceKey);
    }
}
