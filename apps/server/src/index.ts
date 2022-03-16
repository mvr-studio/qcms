/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const cors = require('micro-cors')({
  origin: process.env.QCMS_CORS_ORIGIN || 'http://localhost:3050'
})
import { ApolloServer } from 'apollo-server-micro'
import { send } from 'micro'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  UserInputError
} from 'apollo-server-core'
import schema from './schema'
import { context } from './context'
import { ZodError } from 'zod'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import cookieParse from 'micro-cookie'
import { VercelRequest, VercelResponse } from '@vercel/node'

const apolloServer = new ApolloServer({
  schema: schema as any,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    httpHeadersPlugin
  ],
  context,
  formatError(error: any) {
    if (error.originalError instanceof ZodError) {
      const zodError = JSON.parse(error.message)[0]
      return new UserInputError(zodError.message, {
        argumentName: `data.${zodError.path}`
      })
    }
    return error
  }
})
const startServer = apolloServer.start()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await startServer
  const apolloHandler = await apolloServer.createHandler({
    path: process.env.QCMS_PATH || '/api/graphql'
  })
  await cors(
    cookieParse(
      ((req: VercelRequest, res: VercelResponse) => {
        req.method === 'OPTIONS'
          ? send(res, 200, 'ok')
          : apolloHandler(req, res)
      })(req, res)
    )
  )
}

module.exports = handler
