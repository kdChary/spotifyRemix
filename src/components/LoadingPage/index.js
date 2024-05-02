import './index.css'

const Loading = () => (
  <div data-testid="loader">
    <div className="loader-content">
      <img
        src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
        alt="login website logo"
        className="loading-img"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  </div>
)

export default Loading
