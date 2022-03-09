import { Router } from '@reach/router'
import Login from './views/Login'

const CommonRouting = () => {
  return (
    <Router>
      <Login path="/login" />
    </Router>
  )
}

export default CommonRouting
