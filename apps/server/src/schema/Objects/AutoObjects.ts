import { objectType } from 'nexus'
import capitalize from '../../utils/capitalize'
import { EntityField, ObjectBlock, Schema } from '../../types'
import config from '../../utils/config'

const mapFieldType = (fieldType: string) => {
  switch (fieldType) {
    case 'Json':
      return 'JSON'
    default:
      return fieldType
  }
}

const getFieldDefinition = (t: ObjectBlock<string>, field: EntityField) => {
  if (field.type === 'Relation')
    return field?.relation === 'belongsTo'
      ? t.field(field.name, { type: field?.model as any })
      : t.list.field(field.name, { type: field?.model as any })
  return t.field(field.name, { type: mapFieldType(field.type) as any })
}

const buildObjects = (schema: Schema) => {
  return Object.entries(schema).map(([objectName, objectDefinition]) =>
    objectType({
      name: capitalize(objectName),
      definition(t: ObjectBlock<string>) {
        t.nonNull.string('id')
        objectDefinition.fields.map((field) => getFieldDefinition(t, field))
        t.nonNull.date('createdAt')
        t.nonNull.date('updatedAt')
      }
    })
  )
}

export default buildObjects(config.schema)
