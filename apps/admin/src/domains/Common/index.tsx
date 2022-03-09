import { AppView } from 'types'
import Layout from './components/Layout'
import CommonRouting from './Routing'

const CommonDomain: AppView = () => {
  return (
    <Layout>
      <CommonRouting />
    </Layout>
  )
}

export default CommonDomain
