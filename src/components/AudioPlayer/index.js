/* eslint-disable jsx-a11y/media-has-caption */
import './index.css'

const AudioPlayer = props => {
  const {trackData, image} = props
  const {trackName, trackImage, trackArtist, previewUrl, duration} = trackData
  const imgSrc = trackImage !== undefined ? trackImage : image

  const playerSection = () => (
    <div className="player-section">
      <audio src={previewUrl} controls preload="metadata" />
    </div>
  )
  return (
    <div className="player-container">
      <div className="left-section">
        <img src={imgSrc} alt={trackName} className="song-image" />
        <div className="song-details">
          <h5 className="song-name">{trackName}</h5>
          <p className="song-artist">{trackArtist}</p>
        </div>
      </div>
      {previewUrl !== undefined ? (
        playerSection()
      ) : (
        <p>Can not play the song</p>
      )}
    </div>
  )
}

export default AudioPlayer
