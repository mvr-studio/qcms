import { ZodFirstPartySchemaTypes, z } from 'zod'
import { ConfigEntity } from '../../types'

export const buildFieldsValidation = (objectDefinition: ConfigEntity) => {
  const fieldsValidation: Record<string, ZodFirstPartySchemaTypes> = {}
  objectDefinition.fields.forEach((field) => {
    if (field.validationSchema) {
      fieldsValidation[field.name] = field.validationSchema(z)
    }
  })
  return fieldsValidation
}
