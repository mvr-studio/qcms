import { arg, nonNull, stringArg } from 'nexus'
import { MutationBlock } from '../../types'
import bcrypt from 'bcryptjs'
import { USER_ROLES } from '../../constants'
import { getSignedJWT, setAuthCookie, unsetAuthCookie } from '../../utils/auth'

const logInUser = (t: MutationBlock) => {
  t.field('logInUser', {
    type: 'AuthResponse',
    args: {
      email: nonNull(stringArg()),
      password: nonNull(stringArg())
    },
    async resolve(_parent, args, context) {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email
        }
      })
      if (!user) throw new Error('Unable to log in')
      const isMatching = bcrypt.compareSync(args.password, user?.passwordDigest || '')
      if (!isMatching) throw new Error('Unable to log in')
      const signedJWT = getSignedJWT(user)
      setAuthCookie({ context, signedJWT })
      return {
        jwt: signedJWT
      }
    }
  })
}

const logOutUser = (t: MutationBlock) => {
  t.field('logOutUser', {
    type: 'JSON',
    resolve(_parent, _args, context) {
      unsetAuthCookie({ context })
      return {
        success: true
      }
    }
  })
}

const registerUser = (t: MutationBlock) => {
  t.field('registerUser', {
    type: 'AuthResponse',
    args: {
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
      name: stringArg()
    },
    async resolve(_parent, args, context) {
      const newUser = await context.prisma.user.create({
        data: {
          email: args.email,
          passwordDigest: bcrypt.hashSync(args.password, 3),
          name: args.name
        }
      })
      const signedJWT = getSignedJWT(newUser)
      setAuthCookie({ context, signedJWT })
      return {
        jwt: signedJWT
      }
    }
  })
}

const createUser = (t: MutationBlock) => {
  t.field('createUser', {
    type: 'User',
    args: {
      data: arg({ type: 'JSON' })
    },
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parent, args, context) {
      return context.prisma.user.create({
        data: args.data
      })
    }
  })
}

const updateUser = (t: MutationBlock) => {
  t.field('updateUser', {
    type: 'User',
    args: {
      id: nonNull(stringArg()),
      data: arg({ type: 'JSON' })
    },
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parents, args, context) {
      return context.prisma.user.update({
        where: {
          id: args.id
        },
        data: args.data
      })
    }
  })
}

const deleteUser = (t: MutationBlock) => {
  t.field('deleteUser', {
    type: 'User',
    args: {
      id: nonNull(stringArg())
    },
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parents, args, context) {
      return context.prisma.user.delete({
        where: {
          id: args.id
        }
      })
    }
  })
}

const buildUserMutations = (t: MutationBlock) => {
  logInUser(t)
  logOutUser(t)
  registerUser(t)
  createUser(t)
  updateUser(t)
  deleteUser(t)
}

export default buildUserMutations
