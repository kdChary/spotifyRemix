/* eslint-disable jsx-a11y/control-has-associated-label */

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiLogoutCircleRLine} from 'react-icons/ri'

import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  const renderHeader = () => (
    <nav className="navbar-sm" data-testid="navbarSm">
      <Link to="/" className="link-item">
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
          alt="website logo"
          className="nav-img"
        />
      </Link>
      <div className="nav-options">
        <FiMenu color="#ffffff" size="21" />
        <button className="logout-btn" type="button" onClick={logOut}>
          <RiLogoutCircleRLine />
        </button>
      </div>
    </nav>
  )

  return <>{renderHeader()}</>
}

export default withRouter(Header)
