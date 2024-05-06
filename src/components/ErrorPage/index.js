import './index.css'

const Failure = props => {
  const {retry} = props

  const btnClicked = () => {
    retry()
  }

  return (
    <div className="failure-view" data-testid="failureView">
      <div className="failure-content">
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712921765/1Spotify/alert.png"
          alt="failure view"
          className="failure-icon"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="failure-btn" type="button" onClick={btnClicked}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Failure
