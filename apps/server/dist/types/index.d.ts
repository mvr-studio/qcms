import type { Maybe, ObjectDefinitionBlock } from 'nexus/dist/core';
import { z, ZodFirstPartySchemaTypes } from 'zod';
declare type User = Record<string, any>;
declare type ValidationSchemaZ = typeof z;
export declare type ObjectBlock<T extends string> = ObjectDefinitionBlock<T>;
export declare type QueryBlock = ObjectDefinitionBlock<'Query'>;
export declare type MutationBlock = ObjectDefinitionBlock<'Mutation'>;
declare type FieldType = 'String' | 'Json' | 'Int' | 'Boolean' | 'Relation';
export interface AutoBlock<T = MutationBlock> {
    t: T;
    objectName: string;
    objectDefinition: ConfigEntity;
}
export declare type EntityField = {
    name: string;
    type: FieldType;
    relation?: string;
    model?: string;
    required?: boolean;
    default?: string | number | boolean;
    validationSchema?: (z: ValidationSchemaZ) => ZodFirstPartySchemaTypes;
};
export declare type PermissionsResolverArgs = {
    user?: Maybe<User>;
    entity?: Record<string, any>;
};
export declare type WhereExtensionArgs = {
    user?: Maybe<User>;
};
declare type PermissionResolver = boolean;
declare type PermissionResolverWithUser = ((args: PermissionsResolverArgs) => boolean) | PermissionResolver;
declare type PermissionResolverWithEntity = ((args: PermissionsResolverArgs) => boolean) | PermissionResolver;
declare type EntityPermissions = {
    findOne?: PermissionResolverWithUser;
    findAll?: PermissionResolverWithUser;
    create?: PermissionResolverWithUser;
    update?: PermissionResolverWithEntity;
    delete?: PermissionResolverWithEntity;
};
export declare type ConfigEntity = {
    fields: EntityField[];
    permissions?: EntityPermissions;
    whereExtension?: (args: WhereExtensionArgs) => any;
};
export declare type Schema = Record<string, ConfigEntity>;
export interface QcmsConfig {
    name: string;
    schema: Schema;
    plugins?: Record<string, boolean>;
}
export {};
