import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'
import AlbumItem from '../AlbumItem'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Album extends Component {
  state = {
    fetchStatus: apiConstant.initial,
    albumsList: {},
  }

  componentDidMount() {
    this.getAlbums()
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  convertDuration = val => {
    const minutes = Math.floor(val / 60000)
    const seconds = ((val % 60000) / 6000).toFixed(0)

    const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
    return time
  }

  modifyData = data => ({
    albumArtist: data.artists[0].name,
    albumId: data.id,
    albumImage: data.images[0].url,
    albumName: this.changeName(data.name),
    albumTracks: data.tracks.items.map(item => ({
      trackId: item.id,
      trackName: this.changeName(item.name),
      trackDuration: this.convertDuration(item.duration_ms),
      trackArtist: item.artists[0].name,
      trackNumber: item.track_number,
      previewUrl: item.preview_url,
    })),
  })

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

    if (response.ok) {
      const data = await response.json()
      const newData = this.modifyData(data)

      this.setState({fetchStatus: apiConstant.success, albumsList: newData})

      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('response Error')
    }
  }

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
          <p className="album-artist">{albumArtist}</p>
        </div>
      </div>
    )
  }

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
              <AlbumItem key={track.trackId} trackData={track} />
            ))}
          </ul>
        </div>
      </>
    )
  }

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
    return (
      <>
        <Sidebar />
        <div className="albums-page" data-testid="albumsPage">
          <BackBtn />
          {this.viewAlbumComponent()}
        </div>
      </>
    )
  }
}

export default Album
