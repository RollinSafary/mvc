import Notifier from '../observer/Notifier';
import Guard from './Guard';

export default abstract class SimpleCommand extends Notifier {
  public guards: Guard[];
  public isChecked: boolean = false;
  public failedGuardsCount: number;

  constructor() {
    super();
    this.guards = [];
    this.prepare();
    this.failedGuardsCount = this.guards.length;
  }

  public async startCommandExecution(
    notificationName?: string,
    ...args: any[]
  ): Promise<void> {
    !this.isChecked && (await this.checkGuards(notificationName, ...args));
    this.startExecution(notificationName, ...args);
  }

  public abstract execute(notificationName?: string, ...args: any[]): void;

  protected onAnyGuardApproved(
    notificationName?: string,
    ...args: any[]
  ): void {
    notificationName;
    args;
  }
  protected onAnyGuardDenied(notificationName?: string, ...args: any[]): void {
    notificationName;
    args;
  }
  protected onAllGuardsDenied(notificationName?: string, ...args: any[]): void {
    notificationName;
    args;
  }

  protected prepare(): void {
    //
  }

  protected addGuards<G extends Guard>(
    ...guardClassRefs: (new () => G)[]
  ): void {
    for (const guardClassRef of guardClassRefs) {
      this.guards.push(new guardClassRef());
    }
  }

  protected sendNotification(notificationName: string, ...args: any[]): void {
    this.facade.sendNotification(notificationName, ...args);
  }

  protected startExecution(notificationName: string, ...args: any[]): void {
    this.failedGuardsCount === 0
      ? this.execute(notificationName, ...args)
      : this.onAnyGuardDenied(notificationName, ...args);
    this.failedGuardsCount === this.guards.length
      ? this.onAllGuardsDenied(notificationName, ...args)
      : this.onAnyGuardApproved(notificationName, ...args);
  }

  protected async checkGuards(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    for (const guard of this.guards) {
      guard.initializeNotifier(this.multitonKey);
      if (await guard.approve(notificationName, ...args)) {
        this.failedGuardsCount--;
      }
    }
    this.isChecked = true;
  }
}
