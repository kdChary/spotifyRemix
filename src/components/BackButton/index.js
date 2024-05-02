import {withRouter} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'

import './index.css'

const BackBtn = props => {
  const toPrevious = () => {
    const {history} = props
    history.goBack()
  }

  return (
    <>
      <button
        className="back-btn"
        data-testid="backBtn"
        type="button"
        onClick={toPrevious}
      >
        <FaArrowLeft size="11" /> Back
      </button>
    </>
  )
}

export default withRouter(BackBtn)
