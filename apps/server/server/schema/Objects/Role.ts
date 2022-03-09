import { enumType } from 'nexus'
import { USER_ROLES } from '../../constants'

const Role = enumType({
  name: 'Role',
  members: Object.keys(USER_ROLES)
})

export default Role
