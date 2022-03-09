import { objectType } from 'nexus'
import buildAutoQueries from './buildAutoQueries'
import buildUserQueries from './buildUserQueries'
import qcms from './qcms'

const Query = objectType({
  name: 'Query',
  definition(t: any) {
    buildUserQueries(t)
    buildAutoQueries(t)
    qcms(t)
  }
})

export default Query
