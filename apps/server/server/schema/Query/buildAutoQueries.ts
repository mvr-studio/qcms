import { arg, intArg, nonNull, stringArg } from 'nexus'
import pluralize from 'pluralize'
import capitalize from '../../utils/capitalize'
import config from '../../utils/config'
import { AutoBlock, QueryBlock } from '../../types'
import { Context } from '../../context'
import { resolvePermissions } from '../../utils/auth'
import { getOperationsNames } from '../../utils/operations'

const schema = config.schema

const getRelations = (
  objectDefinition: AutoBlock<QueryBlock>['objectDefinition']
) => {
  return Object.fromEntries(
    objectDefinition.fields
      .filter((field) => field.model)
      .map((field) => [
        field.relation === 'belongsTo' ? field.name : pluralize(field.name),
        true
      ])
  )
}

const autoFindAllQuery = ({
  t,
  objectName,
  objectDefinition
}: AutoBlock<QueryBlock>) => {
  const FIND_ALL_NAME = getOperationsNames(objectName).findAll
  t.list.field(FIND_ALL_NAME, {
    type: capitalize(objectName) as any,
    args: {
      where: arg({ type: 'JSON' }),
      orderBy: arg({ type: 'JSON' }),
      skip: intArg(),
      take: intArg()
    },
    async authorize(_parents, _args, context: Context) {
      if (!objectDefinition.permissions?.findAll) return true
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.findAll,
        user: context.session?.data
      })
    },
    resolve(_parents, args, context: Context) {
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.findMany({
        where: args.where,
        orderBy: args.orderBy,
        skip: args.skip,
        take: args.take,
        include: getRelations(objectDefinition)
      })
    }
  })
}

const autoFindOneQuery = ({
  t,
  objectName,
  objectDefinition
}: AutoBlock<QueryBlock>) => {
  const FIND_ONE_NAME = getOperationsNames(objectName).findOne
  t.nullable.field(FIND_ONE_NAME, {
    type: capitalize(objectName) as any,
    args: {
      id: nonNull(stringArg())
    },
    async authorize(_parents, args, context: Context) {
      if (!objectDefinition.permissions?.findOne) return true
      const prismaObject = (context.prisma as any)?.[objectName]
      const entity = await prismaObject.findUnique({
        where: {
          id: args.id
        }
      })
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.findOne,
        user: context.session?.data,
        entity
      })
    },
    resolve(_parents, args, context: Context) {
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.findUnique({
        where: {
          id: args.id
        },
        include: getRelations(objectDefinition)
      })
    }
  })
}

const buildAutoQueries = (t: QueryBlock) => {
  return Object.entries(schema).map(([objectName, objectDefinition]) => {
    autoFindAllQuery({ t, objectName, objectDefinition })
    autoFindOneQuery({ t, objectName, objectDefinition })
  })
}

export default buildAutoQueries
