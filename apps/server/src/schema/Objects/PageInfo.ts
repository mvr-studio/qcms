import { objectType } from 'nexus'

const PageInfo = objectType({
  name: 'PageInfo',
  definition(t: any) {
    t.nonNull.boolean('hasNextPage')
    t.nonNull.boolean('hasPreviousPage')
    t.nonNull.int('startCursor')
    t.nonNull.int('endCursor')
    t.nonNull.int('endPage')
    t.nonNull.int('currentPage')
  }
})

export default PageInfo
