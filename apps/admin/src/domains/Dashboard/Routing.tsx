import { Router } from '@reach/router'
import Home from './views/Home'
import ObjectAll from './views/ObjectAll'
import ObjectOne from './views/ObjectOne'

const DashboardRouting = () => {
  return (
    <Router>
      <Home path="/" />
      <ObjectAll path="/:collection" />
      <ObjectOne path="/:collection/:objectId" />
    </Router>
  )
}

export default DashboardRouting
