import { AppView } from 'types'
import Layout from './components/Layout'
import DashboardRouting from './Routing'

const DashboardDomain: AppView = () => {
  return (
    <Layout>
      <DashboardRouting />
    </Layout>
  )
}

export default DashboardDomain
