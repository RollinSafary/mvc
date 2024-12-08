import { FunctionArgs } from "../../common/general";
import MacroCommand from "./MacroCommand";
import SimpleCommand from "./SimpleCommand";

export default class AsyncMacroCommand<T extends SimpleCommand> extends MacroCommand<T> {
    public async execute<A extends FunctionArgs>(notificationName?: string, ...args: A): Promise<void> {
        this.subCommands.length > 0 && (await this.executeSubCommands(notificationName, ...args));
        this.exclusiveSubCommands.length > 0 && (await this.executeExclusiveSubCommands(notificationName, ...args));
    }

    protected async executeSubCommands<A extends FunctionArgs>(notificationName: string, ...args: A): Promise<void> {
        while (this.subCommands.length > 0) {
            const ref: new () => T = this.subCommands.shift();
            const cmd: T = new ref();
            cmd.initializeNotifier(this.singletonInstanceKey);
            await cmd.startCommandExecution(notificationName, ...args);
        }
    }
}
