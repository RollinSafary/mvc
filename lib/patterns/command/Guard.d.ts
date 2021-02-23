import Notifier from '../observer/Notifier';
export default abstract class Guard extends Notifier {
    abstract approve(notificationName?: string, ...args: any[]): boolean | Promise<boolean>;
}
