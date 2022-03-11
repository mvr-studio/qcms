import { objectType } from 'nexus'
import pluralize from 'pluralize'
import capitalize from '../../utils/capitalize'
import { getUserRelations } from '../../utils/prismaSchema'

const User = objectType({
  name: 'User',
  definition(t: any) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.string('email')
    t.field('role', { type: 'Role' })
    getUserRelations().map(([objectName]) => {
      t.field(pluralize(objectName), { type: capitalize(objectName) })
    })
    t.nonNull.date('createdAt')
    t.nonNull.date('updatedAt')
  }
})

export default User
