import { ZodFirstPartySchemaTypes, z } from 'zod'
import { ConfigEntity } from '../../types'

export const buildFieldsValidation = (objectDefinition: ConfigEntity) => {
  const fieldsValidation: Record<string, ZodFirstPartySchemaTypes> = {}
  objectDefinition.fields.forEach((field) => {
    fieldsValidation[field.name] =
      (field.validationSchema && field.validationSchema(z)) || z.any()
  })
  return fieldsValidation
}
