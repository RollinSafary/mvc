import { FunctionArgs } from "../../common/general";
import Notifier from "../observer/Notifier";
import Guard from "./Guard";

export default abstract class SimpleCommand extends Notifier {
    public guards: Guard[];
    public isChecked: boolean = false;
    protected failedGuards: string[] = [];
    protected approvedGuards: string[] = [];

    constructor() {
        super();
        this.guards = [];
        this.prepare();
    }

    public async startCommandExecution<A extends FunctionArgs>(notificationName?: string, ...args: A): Promise<void> {
        !this.isChecked && (await this.checkGuards(notificationName, ...args));
        this.startExecution(notificationName, ...args);
    }

    public abstract execute<A extends FunctionArgs>(notificationName?: string, ...args: A): void;

    protected onAnyGuardApproved<A extends FunctionArgs>(notificationName?: string, ...args: A): void {
        notificationName;
        args;
    }
    protected onAnyGuardDenied<A extends FunctionArgs>(notificationName?: string, ...args: A): void {
        notificationName;
        args;
    }
    protected onAllGuardsDenied<A extends FunctionArgs>(notificationName?: string, ...args: A): void {
        notificationName;
        args;
    }

    protected prepare?(): void;

    protected addGuards<G extends Guard>(...guardClassRefs: (new () => G)[]): void {
        for (const guardClassRef of guardClassRefs) {
            this.guards.push(new guardClassRef());
        }
    }

    protected sendNotification<A extends FunctionArgs>(notificationName: string, ...args: A): void {
        this.facade.sendNotification(notificationName, ...args);
    }

    protected startExecution<A extends FunctionArgs>(notificationName: string, ...args: A): void {
        switch (true) {
            case this.approvedGuardsCount === this.guards.length:
                this.execute(notificationName, ...args);
                break;
            case this.failedGuardsCount === this.guards.length:
                this.onAllGuardsDenied(notificationName, ...args);
                break;
            default:
                this.onAnyGuardApproved(notificationName, ...args);
                this.onAnyGuardDenied(notificationName, ...args);
                break;
        }
    }

    protected async checkGuards<A extends FunctionArgs>(notificationName: string, ...args: A): Promise<void> {
        for (const guard of this.guards) {
            const guardName: string = guard.constructor.name;
            guard.initializeNotifier(this.singletonInstanceKey);
            const isApproved = await guard.approve(notificationName, ...args);
            isApproved ? this.approvedGuards.push(guardName) : this.failedGuards.push(guardName);
        }
        this.isChecked = true;
    }

    protected get failedGuardsCount(): number {
        return this.failedGuards.length;
    }

    protected get approvedGuardsCount(): number {
        return this.approvedGuards.length;
    }
}
