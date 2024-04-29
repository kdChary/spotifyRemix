import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value, errMsg: ''})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, errMsg: ''})
  }

  authorizeUser = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
      this.setState({password: '', username: '', errMsg: ''})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="input-card" data-testid="inputCard">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          className="input"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="input-card" data-testid="inputCard">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          className="input"
        />
      </div>
    )
  }

  renderLoginForm = () => {
    const {errMsg} = this.state

    return (
      <form
        className="form"
        onSubmit={this.authorizeUser}
        id="loginForm"
        data-testid="form"
      >
        {this.renderUsernameInput()}
        {this.renderPasswordInput()}
        <button type="submit" className="login-btn">
          Login
        </button>
        {errMsg.length && (
          <p className="err-msg" data-testid="errMsg">
            *{errMsg}
          </p>
        )}
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form" data-testid="loginForm">
        <div className="inner-container">
          <div className="app-details-card">
            <img
              src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
              alt="login website logo"
              className="app-logo"
            />
            <h2 className="app-name">Spotify Remix</h2>
          </div>
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default LoginForm
