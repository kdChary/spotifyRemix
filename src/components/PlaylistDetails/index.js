import {Component} from 'react'
import Cookies from 'js-cookie'

// importing self defined components.
import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'
import PlaylistItem from '../PlaylistDetailsItem'
import AudioPlayer from '../AudioPlayer'

// importing self defined utility functions.
import {apiConstant, modifyPlaylistData} from '../../utils/functions'

class PlaylistDetails extends Component {
  state = {
    playlists: {},
    fetchStatus: apiConstant.initial,
    selectedSong: {},
  }

  componentDidMount() {
    this.getPlaylists()
  }

  // Function to update state with playing song.
  chosenSong = data => {
    this.setState({selectedSong: data})
  }

  // Function to fetch the Specific Playlists from Database.
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
    const data = await response.json()

    if (response.ok) {
      const newData = modifyPlaylistData(data)
      this.setState({fetchStatus: apiConstant.success, playlists: newData})

      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log(`${data.error_msg}`)
    }
  }

  // JSX to display Playlist title and cover image.
  playlistsHeader = () => {
    const {playlists} = this.state
    const {image, name, artist} = playlists
    // TODO: removed description to beautify.

    return (
      <>
        <div className="playlist-header">
          <div>
            <img src={image} alt={name} className="playlist-image" />
          </div>
          <div className="playlist-details">
            <p className="playlist-type">Editor&#39;s Picks</p>
            <h2 className="playlist-name">{name}</h2>
            <p className="playlist-artist">{artist}</p>
          </div>
        </div>
        {/* <p className="playlist-artist">{description}</p> */}
      </>
    )
  }

  // JSX to display the received tracks.
  renderPlaylist = () => {
    const {playlists} = this.state
    const {tracks} = playlists
    // console.log(tracks)

    return (
      <>
        <div className="playlist-tracks">
          <ul className="playlist-track-headings">
            <li className="playlist-heading-item hash">
              <p className="playlist-track-heading">#</p>
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

  // Switch case to display the page states.
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
          <div>
            {selectedSong.trackId !== undefined && (
              <AudioPlayer
                key={selectedSong.trackId}
                trackData={selectedSong}
                image={playlists.image}
              />
            )}
          </div>
        </div>
      </>
    )
  }
}

export default PlaylistDetails
