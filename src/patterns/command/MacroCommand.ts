import { Guard } from '../../../../..';
import SimpleCommand from './SimpleCommand';

export default abstract class MacroCommand<
  T extends SimpleCommand
> extends SimpleCommand {
  protected subCommands: Array<new () => T>;
  protected exclusiveSubCommands: Array<IExclusiveSubCommand<T>>;

  constructor() {
    super();
    this.subCommands = [];
    this.exclusiveSubCommands = [];
    this.initializeMacroCommand();
  }

  protected initializeMacroCommand(): void {}

  protected addSubCommand(subCommand: new () => T): void {
    this.subCommands.push(subCommand);
  }

  protected addExclusiveSubCommand(
    subCommand: new () => T,
    ...guards: Array<new () => Guard>
  ): void {
    const guardsInstances: Guard[] = [];
    for (const guard of guards) {
      guardsInstances.push(new guard());
    }
    this.exclusiveSubCommands.push({
      command: subCommand,
      guards: guardsInstances,
    });
  }

  protected async executeExclusiveSubCommands(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    for (const exclusiveSubCommand of this.exclusiveSubCommands) {
      const cmd: T = new exclusiveSubCommand.command();
      const guards: Guard[] = [...cmd.guards, ...exclusiveSubCommand.guards];
      let failedGuardsCount: number = 0;
      for (const guard of guards) {
        guard.initializeNotifier(this.multitonKey);
        if (!(await guard.approve(notificationName, ...args))) {
          failedGuardsCount++;
        }
      }
      cmd.isChecked = true;
      if (failedGuardsCount === 0) {
        cmd.initializeNotifier(this.multitonKey);
        await cmd.startCommandExecution(notificationName, ...args);
        return;
      }
    }
  }
}

export interface IExclusiveSubCommand<T extends SimpleCommand> {
  command: new () => T;
  guards: Guard[];
}
