import { readFile, writeFile } from './file'
import config from './config'
import capitalize from './capitalize'
import dedent from 'dedent'
import pluralize from 'pluralize'

const dateFieldsTemplate = dedent`
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
`

const getSchemaTemplate = () => {
  return readFile('../../prisma/schema.template.prisma')
}

const getFieldTemplate = (field: any) => {
  const typedDefault =
    field.type === 'String'
      ? `@default("${field.default}")`
      : `@default(${field.default})`
  const defaultProperty = field.default ? typedDefault : ''

  return `${field.name} ${field.type}${
    field?.required ? '' : '?'
  } ${defaultProperty}`
}

const getRelationTemplate = (field: any) => {
  switch (field.relation) {
    case 'belongsTo':
      return `${field.name} ${field.model}${
        field?.required ? '' : '?'
      } @relation(fields: [${field.name}Id], references: [id])\n${
        field.name
      }Id String${field?.required ? '' : '?'}`
    case 'hasMany':
      return `${pluralize(field.name)}  ${field.model}[]`
  }
}

const buildField = (field: any) => {
  const defaultTemplate = getFieldTemplate(field)
  switch (field.type) {
    case 'String':
      return defaultTemplate
    case 'Json':
      return defaultTemplate
    case 'Int':
      return defaultTemplate
    case 'Relation':
      return getRelationTemplate(field)
    default:
      throw new Error('Unknown field type')
  }
}

const buildModels = () => {
  return Object.entries(config.schema)
    .map(
      ([objectName, objectProperties]) => dedent`
    model ${capitalize(objectName)} {
      id   String @id @default(uuid())
      ${objectProperties.fields.map((field) => buildField(field)).join('\n')}
      ${dateFieldsTemplate}
    }
  `
    )
    .join('\n')
}

export const getUserRelations = () =>
  Object.entries(config.schema).filter(([_, objectDefinition]) =>
    objectDefinition.fields.some((field) => field.model === 'User')
  )

const buildUserRelations = () => {
  return getUserRelations()
    .map(
      ([objectName]) => `${pluralize(objectName)} ${capitalize(objectName)}[]`
    )
    .join('\n')
}

export const buildSchema = () => {
  const schemaTemplate = getSchemaTemplate()
  const modelsTemplate = buildModels()
  const userRelations = buildUserRelations()
  const schema = schemaTemplate
    .replace('//AUTO', modelsTemplate)
    .replace('//USER_RELATIONS', userRelations)
  return writeFile('../../prisma/schema.prisma', schema)
}

// buildSchema()
