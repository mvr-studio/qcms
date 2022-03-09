import prisma from './utils/prisma'
import type { PrismaClient, User } from '@prisma/client'
import { decodeToken } from './utils/auth'

export interface Context {
  prisma: PrismaClient
  session: {
    data?: User | null
  }
  user: User | null
  setCookies: Array<any>
  setHeaders: Array<any>
}

export const context = async ({ req }: any): Promise<Context> => {
  const authHeader =
    req.cookies?.['Q-AUTHENTICATION'] || req.headers.authorization
  const session =
    authHeader &&
    authHeader !== 'null' &&
    (decodeToken(authHeader) as User | null)
  let user: User | null = null
  try {
    user =
      session &&
      (await prisma.user.findUnique({
        where: {
          id: session.data.id
        }
      }))
  } catch {}
  return {
    prisma,
    session,
    user,
    setCookies: new Array(),
    setHeaders: new Array()
  }
}
