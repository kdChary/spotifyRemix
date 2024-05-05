/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */
import {useState, useRef} from 'react'
import {FaPlay, FaPause} from 'react-icons/fa'

import './index.css'

const AudioPlayer = props => {
  const [isPlaying, playSong] = useState(false)

  const {trackData, image} = props
  const {trackName, trackImage, trackArtist, previewUrl} = trackData
  const imgSrc = trackImage !== undefined ? trackImage : image
  const artist = trackArtist.split(' ')[0]

  const audioPlayer = useRef()

  const togglePlay = () => {
    playSong(!isPlaying)

    if (!isPlaying) {
      audioPlayer.current.play()
    } else {
      audioPlayer.current.pause()
    }
  }

  const playerSection = () => (
    <div className="player-section">
      <audio
        src={previewUrl}
        preload="metadata"
        controls
        className="music-player"
      />
      <audio ref={audioPlayer} src={previewUrl} preload="metadata" />
    </div>
  )

  return (
    <div className="player-container">
      <div className="left-section">
        <img src={imgSrc} alt={trackName} className="song-image" />
        <div className="song-details">
          <h5 className="song-name">{trackName}</h5>
          <p className="song-artist">{artist}</p>
        </div>
      </div>
      {previewUrl !== undefined ? (
        playerSection()
      ) : (
        <p>Can not play the song</p>
      )}
      <button type="button" className="play-pause-btn" onClick={togglePlay}>
        {!isPlaying ? <FaPlay /> : <FaPause />}
      </button>
    </div>
  )
}

export default AudioPlayer
