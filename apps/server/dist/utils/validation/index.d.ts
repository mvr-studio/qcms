import { ZodFirstPartySchemaTypes } from 'zod';
import { ConfigEntity } from '../../types';
export declare const buildFieldsValidation: (objectDefinition: ConfigEntity) => Record<string, ZodFirstPartySchemaTypes>;
