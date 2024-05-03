import './index.css'

const AlbumItem = props => {
  const {trackData} = props
  const {trackName, trackDuration, trackArtist, trackNumber} = trackData

  return (
    <li className="track-item">
      <div className="hash">
        <p className="track-item-text">{trackNumber}</p>
      </div>
      <div className="track-item-data">
        <p className="track-item-text">{trackName}</p>
      </div>
      <div className="track-item-data">
        <p className="track-item-text">{trackArtist}</p>
      </div>
      <div className="track-item-data">
        <p className="track-item-text">{trackDuration}</p>
      </div>
    </li>
  )
}

export default AlbumItem
