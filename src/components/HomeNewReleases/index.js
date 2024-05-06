import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

// Importing self defined components.
import './index.css'
import HomeItem from '../HomeItem'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'

// Importing self defined utility functions.
import {apiConstant, modifyEditorsPicks} from '../../utils/functions'

class HomeNewReleases extends Component {
  state = {newReleases: [], fetchStatus: apiConstant.initial}

  componentDidMount() {
    this.getNewReleases()
  }

  // Fetching response from server
  getNewReleases = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const token = Cookies.get('jwt_token')

    const url = `https://apis2.ccbp.in/spotify-clone/new-releases?country=IN&timestamp=${timeStamp}`
    const options = {
      method: 'GET',
      Headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = data.albums.items.map(items => modifyEditorsPicks(items))
      this.setState({fetchStatus: apiConstant.success, newReleases: newData})

      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  // JSX to display  fetched data
  renderNewReleases = () => {
    const {newReleases} = this.state

    return (
      <>
        <ul className="playlist">
          {newReleases.map(genre => (
            <HomeItem key={genre.id} playListData={genre} type="album" />
          ))}
        </ul>
      </>
    )
  }

  // Switch case to display different states.
  viewPlayList = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderNewReleases()}</>

      case apiConstant.failure:
        return <Failure retry={this.getNewReleases} />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="new-releases" data-testid="newReleases">
        <h1 className="home-playlist-title">New Releases</h1>
        {this.viewPlayList()}
      </div>
    )
  }
}

export default HomeNewReleases
