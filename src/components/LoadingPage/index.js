import './index.css'

const Loading = () => (
  <div className="loader" data-testid="loader">
    <img
      src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
      alt="login website logo"
      className="loading-img"
    />
    <h1 className="loading-text">Loading...</h1>
  </div>
)

export default Loading
