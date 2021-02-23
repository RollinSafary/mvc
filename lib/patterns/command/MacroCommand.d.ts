import Guard from './Guard';
import SimpleCommand from './SimpleCommand';
export default abstract class MacroCommand<T extends SimpleCommand> extends SimpleCommand {
    protected subCommands: Array<new () => T>;
    protected exclusiveSubCommands: Array<IExclusiveSubCommand<T>>;
    constructor();
    protected initializeMacroCommand(): void;
    protected addSubCommand(subCommand: new () => T): void;
    protected addExclusiveSubCommand(subCommand: new () => T, ...guards: Array<new () => Guard>): void;
    protected executeExclusiveSubCommands(notificationName: string, ...args: any[]): Promise<void>;
}
export interface IExclusiveSubCommand<T extends SimpleCommand> {
    command: new () => T;
    guards: Guard[];
}
