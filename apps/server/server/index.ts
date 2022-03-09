require('dotenv').config()
const cors = require('micro-cors')({ origin: 'http://localhost:3050' })
import { ApolloServer } from 'apollo-server-micro'
import { send } from 'micro'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  UserInputError
} from 'apollo-server-core'
import schema from './schema'
import { context } from './context'
import { ZodError } from 'zod'
// @ts-ignore
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
// @ts-ignore
import cookieParse from 'micro-cookie'

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
module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler()
  return cors(
    cookieParse((req: any, res: any) =>
      req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res)
    )
  )
})
