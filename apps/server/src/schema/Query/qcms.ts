import pluralize from 'pluralize'
import { USER_ROLES } from '../../constants'
import { QueryBlock } from '../../types'
import config from '../../utils/config'
import { getOperationsNames } from '../../utils/operations'

const qcms = (t: QueryBlock) => {
  t.field('qcms', {
    type: 'CmsInfo',
    authorize(_root, _args, context) {
      return context.user?.role === USER_ROLES.ADMIN
    },
    resolve(_parents, _args, _context) {
      const schema: Record<string, any> = Object.fromEntries(
        Object.entries(config.schema).map(([objectName, objectDefinition]) => [
          objectName,
          {
            plural: pluralize(objectName),
            operations: getOperationsNames(objectName),
            ...objectDefinition
          }
        ])
      )
      schema['user'] = {
        plural: 'users',
        operations: getOperationsNames('user'),
        fields: [
          { name: 'name', type: 'String' },
          { name: 'email', type: 'String' }
        ]
      }
      return {
        schema
      }
    }
  })
}

export default qcms
