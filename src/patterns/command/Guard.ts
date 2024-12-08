import { FunctionArgs } from "../../common/general";
import Notifier from "../observer/Notifier";

export default abstract class Guard extends Notifier {
    public abstract approve<A extends FunctionArgs>(notificationName?: string, ...args: A): boolean | Promise<boolean>;
}
