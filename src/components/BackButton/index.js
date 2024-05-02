import {withRouter} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

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
        <BsArrowLeft /> Back
      </button>
    </>
  )
}

export default withRouter(BackBtn)
