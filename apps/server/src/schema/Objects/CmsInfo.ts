import { objectType } from 'nexus'

const CmsInfo = objectType({
  name: 'CmsInfo',
  definition(t: any) {
    t.field('schema', {
      type: 'JSON'
    })
  }
})

export default CmsInfo
