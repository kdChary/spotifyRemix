import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {RiLogoutCircleRLine} from 'react-icons/ri'

import './index.css'

const Sidebar = props => {
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="sidebar" data-testid="sidebar">
      <Link to="/" className="link-item">
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      {/* <button type="button" className="case-btn">
          Logout
        </button> */}
      <button type="button" onClick={logoutClicked} className="side-logout-btn">
        Logout
        <RiLogoutCircleRLine className="icon" />
      </button>
    </div>
  )
}

export default withRouter(Sidebar)
