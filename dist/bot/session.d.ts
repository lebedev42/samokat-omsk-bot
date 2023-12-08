import { Context } from './context';
export interface Session {
}
export declare const initial: () => Session;
export declare function getSessionKey(ctx: Context): string | undefined;
export declare const session: import("grammy").MiddlewareFn<import("grammy").Context & import("grammy").SessionFlavor<Session>>;
