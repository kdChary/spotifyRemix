import {BsExclamationTriangleFill} from 'react-icons/bs'

import './index.css'

const Failure = props => {
  const {retry} = props

  const btnClicked = () => {
    retry()
  }

  return (
    <div className="failure-view" data-testid="failureView">
      <div className="failure-content">
        <BsExclamationTriangleFill className="failure-icon" />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="failure-btn" type="button" onClick={btnClicked}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Failure