import {Link} from 'react-router-dom'

import './index.css'

const GenreItem = props => {
  const {genreData} = props
  const {id, name, imageUrl, tracks} = genreData

  return (
    <Link to={`/playlist/${id}`} className="link-item">
      <li className="genre-item">
        <div>
          <img src={imageUrl} alt="" className="genre-img" />
        </div>
        <div className="genre-details">
          <h3 className="genre-title">{name}</h3>
          <p className="genre-tracks">{tracks} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default GenreItem
