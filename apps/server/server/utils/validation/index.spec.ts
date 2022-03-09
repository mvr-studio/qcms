import { ConfigEntity } from '../../types'
import { buildFieldsValidation } from '.'
import { z } from 'zod'

test('buildFieldsValidation reflects zod validation', () => {
  const objectDefinition: ConfigEntity = {
    fields: [
      {
        name: 'name',
        type: 'String',
        validationSchema: (z) => z.string().min(3)
      }
    ]
  }
  const fieldsValidation = buildFieldsValidation(objectDefinition)
  const resultMock = { name: z.string().min(3) }
  expect(JSON.stringify(fieldsValidation)).toEqual(JSON.stringify(resultMock))
})
