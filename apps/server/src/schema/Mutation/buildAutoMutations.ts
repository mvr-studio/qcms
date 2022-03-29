import { arg, nonNull, stringArg } from 'nexus'
import capitalize from '../../utils/capitalize'
import { AutoBlock, MutationBlock } from '../../types'
import { Context } from '../../context'
import config from '../../utils/config'
import { z } from 'zod'
import { buildFieldsValidation } from '../../utils/validation'
import { getOperationsNames } from '../../utils/operations'
import { resolvePermissions } from '../../utils/auth'

const autoCreateMutation = ({ t, objectName, objectDefinition }: AutoBlock) => {
  const CREATE_NAME = getOperationsNames(objectName).create
  t.field(CREATE_NAME, {
    type: capitalize(objectName) as any,
    args: {
      data: arg({ type: 'JSON' })
    },
    authorize(_parents, _args, context: Context) {
      if (!objectDefinition.permissions?.create) return true
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.create,
        user: context.user
      })
    },
    resolve(_parents, args, context: Context) {
      const fieldsValidation = buildFieldsValidation(objectDefinition)
      const dataValidation = z.object(fieldsValidation)
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.create({
        data: dataValidation.parse(args.data)
      })
    }
  })
}

const autoUpdateMutation = ({ t, objectName, objectDefinition }: AutoBlock) => {
  const UPDATE_NAME = getOperationsNames(objectName).update
  t.field(UPDATE_NAME, {
    type: capitalize(objectName) as any,
    args: {
      id: nonNull(stringArg()),
      data: arg({ type: 'JSON' })
    },
    async authorize(_parents, args, context: Context) {
      if (!objectDefinition.permissions?.update) return true
      const prismaObject = (context.prisma as any)?.[objectName]
      const entity = await prismaObject.findFirst({
        where: {
          id: args.id,
          ...(objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))
        }
      })
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.update,
        user: context.user,
        entity: entity
      })
    },
    resolve(_parents, args, context: Context) {
      const fieldsValidation = buildFieldsValidation(objectDefinition)
      const dataValidation = z.object(fieldsValidation)
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.update({
        where: {
          id: args.id
        },
        data: dataValidation.parse(args.data)
      })
    }
  })
}

const autoDeleteMutation = ({ t, objectName, objectDefinition }: AutoBlock) => {
  const DELETE_NAME = getOperationsNames(objectName).delete
  t.field(DELETE_NAME, {
    type: capitalize(objectName) as any,
    args: {
      id: nonNull(stringArg())
    },
    async authorize(_parents, args, context: Context) {
      if (!objectDefinition.permissions?.delete) return true
      const prismaObject = (context.prisma as any)?.[objectName]
      const entity = await prismaObject.findUnique({
        where: {
          id: args.id,
          ...(objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))
        }
      })
      return resolvePermissions({
        permissionsResolver: objectDefinition.permissions?.delete,
        user: context.user,
        entity: entity
      })
    },
    resolve(_parents, args, context: Context) {
      const prismaObject = (context.prisma as any)?.[objectName]
      return prismaObject.delete({
        where: {
          id: args.id
        }
      })
    }
  })
}

const buildAutoMutations = (t: MutationBlock) => {
  return Object.entries(config.schema).map(([objectName, objectDefinition]) => {
    autoCreateMutation({ t, objectName, objectDefinition })
    autoUpdateMutation({ t, objectName, objectDefinition })
    autoDeleteMutation({ t, objectName, objectDefinition })
  })
}

export default buildAutoMutations
