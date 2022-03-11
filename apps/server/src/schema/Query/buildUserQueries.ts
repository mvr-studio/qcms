import { nonNull, stringArg } from 'nexus'
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
  t.list.field('users', {
    type: 'User',
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parents, _args, context) {
      return context.prisma.user.findMany()
    }
  })
}

const buildAutoQueries = (t: QueryBlock) => {
  me(t)
  userById(t)
  users(t)
}

export default buildAutoQueries
