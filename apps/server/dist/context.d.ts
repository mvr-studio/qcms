import type { PrismaClient, User } from '@prisma/client';
import { VercelRequest } from '@vercel/node';
import { Maybe } from 'nexus/dist/core';
export interface Context {
    prisma: PrismaClient;
    session: {
        data?: Maybe<User>;
    };
    user: Maybe<User>;
    setCookies: Array<any>;
    setHeaders: Array<any>;
}
interface ContextProps {
    req: VercelRequest;
}
export declare const context: ({ req }: ContextProps) => Promise<Context>;
export {};
