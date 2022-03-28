import { Context } from '../../context';
import { Maybe } from 'nexus/dist/core';
import { PermissionsResolverArgs } from '../../types';
declare type User = Record<string, any>;
export declare const decodeToken: (authHeader: string) => Record<string, string | number> | null;
interface ResolvePermissionsProps {
    permissionsResolver: boolean | ((args: PermissionsResolverArgs) => any);
    entity?: Record<string, any>;
    user?: Maybe<User>;
}
export declare const resolvePermissions: ({ permissionsResolver, entity, user }: ResolvePermissionsProps) => boolean;
export declare const getSignedJWT: (data: Record<string, any>) => string;
interface SetAuthCookieProps {
    context: Context;
    signedJWT: string;
}
export declare const setAuthCookie: ({ context, signedJWT }: SetAuthCookieProps) => number;
export declare const unsetAuthCookie: ({ context }: Omit<SetAuthCookieProps, 'signedJWT'>) => number;
export {};
