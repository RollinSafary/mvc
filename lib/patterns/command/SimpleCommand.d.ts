import Notifier from '../observer/Notifier';
import Guard from './Guard';
export default abstract class SimpleCommand extends Notifier {
    guards: Guard[];
    isChecked: boolean;
    failedGuardsCount: number;
    constructor();
    startCommandExecution(notificationName?: string, ...args: any[]): Promise<void>;
    abstract execute(notificationName?: string, ...args: any[]): void;
    protected onAnyGuardApproved(notificationName?: string, ...args: any[]): void;
    protected onAnyGuardDenied(notificationName?: string, ...args: any[]): void;
    protected onAllGuardsDenied(notificationName?: string, ...args: any[]): void;
    protected prepare(): void;
    protected addGuards<G extends Guard>(...guardClassRefs: (new () => G)[]): void;
    protected sendNotification(notificationName: string, ...args: any[]): void;
    protected startExecution(notificationName: string, ...args: any[]): void;
    protected checkGuards(notificationName: string, ...args: any[]): Promise<void>;
}
