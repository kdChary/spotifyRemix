import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found" data-testid="notFound">
      <div>
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712285974/1Spotify/404-sm.png"
          alt="page not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <Link to="/" className="link-item">
          <button type="button" className="not-found-btn">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
