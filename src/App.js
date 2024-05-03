// importing package components..
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginPage'
import NotFound from './components/NotFoundPage'
import HomePage from './components/HomePage'
import GenreAndMoods from './components/GenreAndMoods'
import Album from './components/AlbumDetails'
import PlaylistDetails from './components/PlaylistDetails'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute
      exact
      path="/category/:id/:playlists"
      component={GenreAndMoods}
    />
    <ProtectedRoute exact path="/album/:id" component={Album} />
    <ProtectedRoute exact path="/playlist/:id" component={PlaylistDetails} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
