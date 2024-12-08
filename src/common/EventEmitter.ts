import { FunctionArgs } from "./general";

interface IListener<C = unknown> {
    once: boolean;
    callback: (...args: FunctionArgs) => void;
    context?: C;
}
type EventType = string | symbol;

export class EventEmitter {
    private eventsMap = new Map<EventType, IListener[]>();
    public on<C, A extends FunctionArgs>(eventName: EventType, callback: (...args: A) => void, context?: C, once?: boolean): this {
        if (this.getEventListeners(eventName) === null) {
            this.eventsMap.set(eventName, []);
        }
        this.getEventListeners(eventName).push({
            once: once || false,
            callback,
            context
        });

        return this;
    }

    public once<C, A extends FunctionArgs>(eventName: EventType, callback: (...args: A) => void, context?: C) {
        return this.on(eventName, callback, context, true);
    }

    public off<C, A extends FunctionArgs>(eventName: EventType, callback: (...args: A) => void, context?: C) {
        const listeners = this.getEventListeners(eventName);
        if (!listeners || !listeners.length) {
            return;
        }
        const targetListener = {
            callback,
            context
        };
        const targetIndex = listeners.findIndex(
            (listener: IListener) => listener.callback === targetListener.callback && listener.context === targetListener.context
        );
        if (listeners.length <= 1) {
            this.eventsMap.delete(eventName);
        } else {
            listeners.splice(targetIndex, 1);
        }
        return this;
    }

    public emit<A extends FunctionArgs>(eventName: EventType, ...args: A): this {
        const listeners = this.getEventListeners(eventName);
        listeners.forEach((listener) => listener.callback.bind(listener.context, ...args));
        return this;
    }

    private getEventListeners(eventName: EventType): IListener[] | null {
        return this.eventsMap.get(eventName);
    }
}
