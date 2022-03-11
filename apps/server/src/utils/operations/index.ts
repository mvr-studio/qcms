import pluralize from 'pluralize'
import capitalize from '../capitalize'

export const getOperationsNames = (name: string) => {
  return {
    findAll: pluralize(name),
    findOne: `${name}ById`,
    create: `create${capitalize(name)}`,
    update: `update${capitalize(name)}`,
    delete: `delete${capitalize(name)}`
  }
}
