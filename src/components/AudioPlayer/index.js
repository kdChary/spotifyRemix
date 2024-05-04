/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */
// import {useState, useRef} from 'react'
import {FaPlay, FaPause} from 'react-icons/fa'

import './index.css'

const AudioPlayer = props => {
  //   const [playing, togglePlay] = useState(false)

  const {trackData, image} = props
  const {trackName, trackImage, trackArtist, previewUrl} = trackData
  const imgSrc = trackImage !== undefined ? trackImage : image

  //   const audioPlayer = useRef()

  //   const togglePlayPause = () => {
  //     togglePlay(!playing)
  //   }

  const playerSection = () => (
    <div className="player-section">
      <audio
        src={previewUrl}
        preload="metadata"
        controls
        className="music-player"
      />
      {/* <div className="music-controls">
        <button className="play-pause-btn" onClick={() => togglePlayPause()}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <input type="range" name="music" className="progressbar" />
      </div> */}
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
