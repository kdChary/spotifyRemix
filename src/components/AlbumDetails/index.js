// importing components from dependencies.
import {Component} from 'react'
import Cookies from 'js-cookie'

// importing defined components
import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'
import AlbumItem from '../AlbumItem'
import AudioPlayer from '../AudioPlayer'

// importing functions from utils folder
import {apiConstant, modifyAlumData} from '../../utils/functions/index'

class Album extends Component {
  state = {
    fetchStatus: apiConstant.initial,
    albumsList: {},
    selectedSong: {},
  }

  componentDidMount() {
    this.getAlbums()
  }

  // function to select a song and add to state.
  chosenSong = data => {
    this.setState({selectedSong: data})
  }

  // function to fetch albums from Database.
  getAlbums = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`

    const options = {
      method: 'GET',
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const newData = modifyAlumData(data)

      this.setState({fetchStatus: apiConstant.success, albumsList: newData})

      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log(`${data.error_msg}`)
    }
  }

  // JSX to display album name, and image
  albumHeader = () => {
    const {albumsList} = this.state
    const {albumName, albumImage, albumArtist} = albumsList

    return (
      <div className="album-header">
        <div>
          <img src={albumImage} alt="" className="album-image" />
        </div>
        <div className="album-details">
          <p className="album-type">New Releases</p>
          <h2 className="album-name">{albumName}</h2>
          <p className="album-artist">
            <span>Album by </span>
            {albumArtist}
          </p>
        </div>
      </div>
    )
  }

  // JSX to display fetched tracks from API.
  renderAlbumTracks = () => {
    const {albumsList} = this.state
    const {albumTracks} = albumsList

    return (
      <>
        {this.albumHeader()}
        <div className="album-tracks">
          <ul className="track-headings">
            <li className="heading-item hash">
              <p className="track-heading">#</p>
            </li>

            <li className="heading-item">
              <p className="track-heading">Track</p>
            </li>

            <li className="heading-item">
              <p className="track-heading">Artist</p>
            </li>

            <li className="heading-item">
              <p className="track-heading">Time</p>
            </li>
          </ul>
          <hr className="line" />
          <ul className="album-tracks-list">
            {albumTracks.map(track => (
              <AlbumItem
                key={track.trackId}
                trackData={track}
                playSong={this.chosenSong}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  // Switch case to display different states of the page.
  viewAlbumComponent = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderAlbumTracks()}</>

      case apiConstant.failure:
        return <Failure retry={this.getAlbums} />

      default:
        return null
    }
  }

  render() {
    const {selectedSong, albumsList} = this.state

    return (
      <>
        <Sidebar />
        <div className="albums-page" data-testid="albumsPage">
          <BackBtn />
          {this.viewAlbumComponent()}
          {selectedSong.trackId !== undefined && (
            <AudioPlayer
              trackData={selectedSong}
              image={albumsList.albumImage}
            />
          )}
        </div>
      </>
    )
  }
}

export default Album
