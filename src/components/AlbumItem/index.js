import './index.css'

const AlbumItem = props => {
  const {trackData, playSong} = props
  const {trackName, trackDuration, trackArtist, trackNumber} = trackData

  return (
    <li className="track-item" onClick={() => playSong(trackData)}>
      <div className="hash large">
        <p className="track-item-text ">{trackNumber}</p>
      </div>
      <div className="track-item-data large">
        <p className="track-item-text ">{trackName}</p>
      </div>
      <div className="track-item-data large">
        <p className="track-item-text">{trackArtist}</p>
      </div>
      <div className="track-item-data large">
        <p className="track-item-text">{trackDuration}</p>
      </div>

      {/* JSX to display in small devices */}
      <div className="small">
        <div>
          <p className="song">{trackName}</p>
          <p className="artist">{trackArtist}</p>
        </div>
        <div>
          <p className="duration">{trackDuration}</p>
        </div>
      </div>
    </li>
  )
}

export default AlbumItem
