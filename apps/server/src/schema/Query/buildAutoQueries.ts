import { arg, intArg, nonNull, objectType, stringArg } from 'nexus'
import pluralize from 'pluralize'
import capitalize from '../../utils/capitalize'
import config from '../../utils/config'
import { AutoBlock, QueryBlock } from '../../types'
import { Context } from '../../context'
import { resolvePermissions } from '../../utils/auth'
import { getOperationsNames } from '../../utils/operations'

const schema = config.schema

const getRelations = (objectDefinition: AutoBlock<QueryBlock>['objectDefinition']) => {
  return Object.fromEntries(
    objectDefinition.fields
      .filter((field) => field.model)
      .map((field) => [field.relation === 'belongsTo' ? field.name : pluralize(field.name), true])
  )
}

const autoFindAllQuery = ({ t, objectName, objectDefinition }: AutoBlock<QueryBlock>) => {
  const LIST_LENGTH = 10
  const ObjectRelayed = objectType({
    name: `${capitalize(pluralize(objectName))}Relayed`,
    definition(t: any) {
      t.field('pageInfo', { type: 'PageInfo' })
      t.list.field('edges', { type: capitalize(objectName) as any })
    }
  })
  const FIND_ALL_NAME = getOperationsNames(objectName).findAll
  t.field(FIND_ALL_NAME, {
    type: ObjectRelayed,
    args: {
      where: arg({ type: 'JSON' }),
      orderBy: arg({ type: 'JSON' }),
      skip: intArg({ default: 0 }),
      take: intArg({ default: LIST_LENGTH })
    },
    async authorize(_parents, _args, context: Context) {
      if (!objectDefinition.permissions?.findAll) return true
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.findAll,
        user: context.user
      })
    },
    async resolve(_parents, args, context: Context) {
      const SKIP = args.skip || 0
      const TAKE = args.take || LIST_LENGTH
      const prismaObject = (context.prisma as any)?.[objectName]
      const objectsCount = await prismaObject.count()
      const edges = await prismaObject.findMany({
        where: {
          ...args.where,
          ...(objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))
        },
        orderBy: args.orderBy,
        skip: args.skip,
        take: args.take,
        include: getRelations(objectDefinition)
      })
      const pageInfo = {
        hasNextPage: SKIP + TAKE < objectsCount,
        hasPreviousPage: SKIP > 0,
        startCursor: args.skip,
        endCursor: SKIP + TAKE,
        endPage: Math.ceil(objectsCount / TAKE),
        currentPage: Math.ceil(objectsCount - SKIP / TAKE)
      }
      return {
        edges,
        pageInfo
      }
    }
  })
}

const autoFindOneQuery = ({ t, objectName, objectDefinition }: AutoBlock<QueryBlock>) => {
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
        user: context.user,
        entity
      })
    },
    resolve(_parents, args, context: Context) {
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.findFirst({
        where: {
          id: args.id,
          ...(objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))
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
