import { makeSchema, fieldAuthorizePlugin, asNexusMethod } from 'nexus'
import Objects from './Objects'
import Query from './Query'
import Mutation from './Mutation'
import JSON from 'graphql-type-json'
import { GraphQLDate } from 'graphql-iso-date'

export const GQLDate = asNexusMethod(GraphQLDate as any, 'date')

export default makeSchema({
  types: [Query, Mutation, ...Objects, JSON, GQLDate],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context'
  },
  plugins: [fieldAuthorizePlugin()]
})
