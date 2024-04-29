// importing package components..
import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginPage'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
  </Switch>
)

export default App
