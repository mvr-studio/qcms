import { Context } from '../../context';
export declare const decodeToken: (authHeader: string) => Record<string, string | number> | null;
export declare const resolvePermissions: ({ permissionsResolver, entity, user }: any) => any;
export declare const getSignedJWT: (data: Record<string, any>) => string;
interface SetAuthCookieProps {
    context: Context;
    signedJWT: string;
}
export declare const setAuthCookie: ({ context, signedJWT }: SetAuthCookieProps) => number;
export declare const unsetAuthCookie: ({ context }: Omit<SetAuthCookieProps, 'signedJWT'>) => number;
export {};
