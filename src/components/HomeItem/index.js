import {Link} from 'react-router-dom'

import './index.css'

const HomeItem = props => {
  const {playListData, type} = props
  const {id, name, imageUrl} = playListData
  let altVal

  if (type === 'playlist') {
    altVal = 'featured playlist'
  } else if (type === 'category') {
    altVal = 'category'
  } else {
    altVal = 'new release album'
  }

  let linkVal
  if (type === 'category') {
    linkVal = `/category/${id}/${name}`
  } else {
    linkVal = `/${type}/${id}`
  }

  return (
    <Link to={linkVal} className="link-item">
      <li className="home-item" data-testid="homeItem">
        <img src={imageUrl} alt={altVal} className="item-image" />
        <p className="item-name">{name}</p>
      </li>
    </Link>
  )
}

export default HomeItem
