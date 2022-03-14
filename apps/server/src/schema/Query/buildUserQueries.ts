import { arg, intArg, nonNull, objectType, stringArg } from 'nexus'
import { QueryBlock } from '../../types'
import { USER_ROLES } from '../../constants'

const me = (t: QueryBlock) => {
  t.field('me', {
    type: 'User',
    authorize(_root, _args, context) {
      return !!context.session?.data
    },
    resolve(_parents, _args, context) {
      return context.prisma.user.findUnique({
        where: {
          email: context.session?.data?.email
        }
      })
    }
  })
}

const userById = (t: QueryBlock) => {
  t.field('userById', {
    type: 'User',
    args: {
      id: nonNull(stringArg())
    },
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parents, args, context) {
      return context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      })
    }
  })
}

const users = (t: QueryBlock) => {
  const LIST_LENGTH = 10
  const UsersRelayed = objectType({
    name: 'UsersRelayed',
    definition(t: any) {
      t.field('pageInfo', { type: 'PageInfo' })
      t.list.field('edges', { type: 'User' })
    }
  })
  t.field('users', {
    type: UsersRelayed,
    args: {
      where: arg({ type: 'JSON' }),
      orderBy: arg({ type: 'JSON' }),
      skip: intArg({ default: 0 }),
      take: intArg({ default: LIST_LENGTH })
    },
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async resolve(_parents, args, context) {
      const SKIP = args.skip || 0
      const TAKE = args.take || LIST_LENGTH
      const usersCount = await context.prisma.user.count()
      const edges = await context.prisma.user.findMany({
        where: args.where,
        orderBy: args.orderBy,
        skip: args.skip || 0,
        take: args.take || LIST_LENGTH
      })
      const pageInfo = {
        hasNextPage: SKIP + TAKE < usersCount,
        hasPreviousPage: SKIP > 0,
        startCursor: args.skip,
        endCursor: SKIP + TAKE,
        endPage: Math.ceil(usersCount / TAKE),
        currentPage: Math.ceil(usersCount - SKIP / TAKE)
      }
      return {
        edges,
        pageInfo
      }
    }
  })
}

const buildAutoQueries = (t: QueryBlock) => {
  me(t)
  userById(t)
  users(t)
}

export default buildAutoQueries
