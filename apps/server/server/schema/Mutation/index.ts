import { objectType } from 'nexus'
import buildAutoMutations from './buildAutoMutations'
import buildUserMutations from './buildUserMutations'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    buildAutoMutations(t)
    buildUserMutations(t)
  }
})

export default Mutation
