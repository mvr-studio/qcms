import prisma from './utils/prisma'
import type { PrismaClient } from '@prisma/client'
import { decodeToken } from './utils/auth'
import { VercelRequest } from '@vercel/node'
import { Maybe } from 'nexus/dist/core'

type User = Record<string, any>

export interface Context {
  prisma: PrismaClient
  session: {
    data?: Maybe<User>
  }
  user: Maybe<User>
  setCookies: Array<any>
  setHeaders: Array<any>
}

interface ContextProps {
  req: VercelRequest
}

export const context = async ({ req }: ContextProps): Promise<Context> => {
  let user: Maybe<User> = null
  const authHeader = req.cookies?.['Q-AUTHENTICATION'] || req.headers.authorization
  const session = (authHeader && authHeader !== 'null' && decodeToken(authHeader)) || { data: null as Maybe<User> }
  try {
    user =
      (session?.data &&
        (await prisma.user.findUnique({
          where: {
            id: (session.data as User)?.id
          }
        }))) ||
      null
  } catch {}
  return {
    prisma,
    session,
    user,
    setCookies: [],
    setHeaders: []
  }
}
