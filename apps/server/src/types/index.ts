import type { Maybe, ObjectDefinitionBlock } from 'nexus/dist/core'
import { z, ZodFirstPartySchemaTypes } from 'zod'

type User = Record<string, any>

type ValidationSchemaZ = typeof z

export type ObjectBlock<T extends string> = ObjectDefinitionBlock<T>
export type QueryBlock = ObjectDefinitionBlock<'Query'>
export type MutationBlock = ObjectDefinitionBlock<'Mutation'>

type FieldType = 'String' | 'Json' | 'Int' | 'Boolean' | 'Relation'

export interface AutoBlock<T = MutationBlock> {
  t: T
  objectName: string
  objectDefinition: ConfigEntity
}

export type EntityField = {
  name: string
  type: FieldType
  relation?: string
  model?: string
  required?: boolean
  default?: string | number | boolean
  validationSchema?: (z: ValidationSchemaZ) => ZodFirstPartySchemaTypes
}

export type PermissionsResolverArgs = {
  user?: Maybe<User>
  entity?: Record<string, any>
}

export type WhereExtensionArgs = {
  user?: Maybe<User>
}

type PermissionResolver = boolean
type PermissionResolverWithUser = ((args: PermissionsResolverArgs) => boolean) | PermissionResolver
type PermissionResolverWithEntity = ((args: PermissionsResolverArgs) => boolean) | PermissionResolver

type EntityPermissions = {
  findOne?: PermissionResolverWithUser
  findAll?: PermissionResolverWithUser
  create?: PermissionResolverWithUser
  update?: PermissionResolverWithEntity
  delete?: PermissionResolverWithEntity
}

export type ConfigEntity = {
  fields: EntityField[]
  permissions?: EntityPermissions
  whereExtension?: (args: WhereExtensionArgs) => any
}

export type Schema = Record<string, ConfigEntity>

export interface QcmsConfig {
  name: string
  schema: Schema
  plugins?: Record<string, boolean>
}
