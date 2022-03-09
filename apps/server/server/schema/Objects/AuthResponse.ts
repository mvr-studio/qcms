import { objectType } from 'nexus'

const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t: any) {
    t.nonNull.string('jwt')
  }
})

export default AuthResponse
