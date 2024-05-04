import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'
import PlaylistItem from '../PlaylistDetailsItem'
import AudioPlayer from '../AudioPlayer'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PlaylistDetails extends Component {
  state = {
    playlists: {},
    fetchStatus: apiConstant.initial,
    selectedSong: {},
  }

  componentDidMount() {
    this.getPlaylists()
  }

  chosenSong = data => {
    this.setState({selectedSong: data})
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  albumName = val => {
    const indx = val.indexOf('(')
    const end = val.length
    if (indx > 0) {
      const album = val.slice(indx, end)
      const index = val.indexOf('\\') - 1
      return album.slice(7, index)
    }
    return val
  }

  convertDuration = val => {
    const minutes = Math.floor(val / 60000)
    const seconds = ((val % 60000) / 6000).toFixed(0)

    const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
    return time
  }

  findDistanceFromNow = date => {
    const newDate = new Date(date)

    return moment(newDate).fromNow()
  }

  modifyData = data => ({
    id: data.id,
    name: this.changeName(data.name),
    image: data.images[0].url,
    artist: data.tracks.items[0].track.artists
      .map(artist => artist.name)
      .join(' '),
    description: data.description,
    tracks: data.tracks.items.map(song => ({
      trackArtist: song.track.artists.map(artist => artist.name).join(' '),
      trackAlbum: this.albumName(song.track.album.name),
      duration: this.convertDuration(song.track.duration_ms),
      trackImage:
        song.track.album.images[0] !== (null || undefined)
          ? song.track.album.images[0].url
          : 'https://i.scdn.co/image/ab67706f0000000366c4920349468f0970205a6a',
      trackId: song.track.id,
      trackName: song.track.name,
      popularity: song.track.popularity,
      previewUrl: song.track.preview_url,
      addedAt: this.findDistanceFromNow(song.added_at),
    })),
  })

  getPlaylists = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      method: 'GET',
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = this.modifyData(data)
      this.setState({fetchStatus: apiConstant.success, playlists: newData})

      console.log(data)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('Response error')
    }
  }

  playlistsHeader = () => {
    const {playlists} = this.state
    const {image, name, artist, description} = playlists

    return (
      <>
        <div className="playlist-header">
          <div>
            <img src={image} alt="" className="playlist-image" />
          </div>
          <div className="playlist-details">
            <p className="playlist-type">Editor&#39;s Picks</p>
            <h2 className="playlist-name">{name}</h2>
            {/* <p className="playlist-artist">{artist}</p> */}
          </div>
        </div>
        <p className="playlist-artist">{description}</p>
      </>
    )
  }

  renderPlaylist = () => {
    const {playlists} = this.state
    const {tracks} = playlists
    // console.log(tracks)

    return (
      <>
        <div className="playlist-tracks">
          <ul className="playlist-track-headings">
            <li className="heading-item hash">
              <p className="playlist-track-heading"> </p>
            </li>

            <li className="playlist-heading-item">
              <p className="playlist-track-heading">Track</p>
            </li>

            <li className="playlist-heading-item">
              <p className="playlist-track-heading">Album</p>
            </li>

            <li className="playlist-heading-item">
              <p className="playlist-track-heading">Time</p>
            </li>

            <li className="playlist-heading-item">
              <p className="playlist-track-heading">Artist</p>
            </li>

            <li className="playlist-heading-item">
              <p className="playlist-track-heading">Added</p>
            </li>
          </ul>
          <hr className="line" />
          <ul className="album-tracks-list">
            {tracks.map(track => (
              <PlaylistItem
                key={track.trackId}
                trackData={track}
                no={tracks.indexOf(track)}
                playSong={this.chosenSong}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  viewPlaylistDetails = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderPlaylist()}</>

      case apiConstant.failure:
        return <Failure retry={this.getPlaylists} />

      default:
        return null
    }
  }

  render() {
    const {selectedSong, playlists} = this.state

    return (
      <>
        <Sidebar />
        <div className="playlists-page" data-testid="playlistDetails">
          <BackBtn />
          {this.playlistsHeader()}
          {this.viewPlaylistDetails()}
          {selectedSong.trackId !== undefined && (
            <AudioPlayer
              key={selectedSong.trackId}
              trackData={selectedSong}
              image={playlists.image}
            />
          )}
        </div>
      </>
    )
  }
}

export default PlaylistDetails
