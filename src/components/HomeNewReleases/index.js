import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

import './index.css'
import HomeItem from '../HomeItem'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeNewReleases extends Component {
  state = {newReleases: [], fetchStatus: apiConstant.initial}

  componentDidMount() {
    this.getNewReleases()
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  modifyData = data => ({
    id: data.id,
    name: this.changeName(data.name),
    imageUrl: data.images[0].url,
  })

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
      const newData = data.albums.items.map(items => this.modifyData(items))
      this.setState({fetchStatus: apiConstant.success, newReleases: newData})

      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  renderNewReleases = () => {
    const {newReleases} = this.state

    return (
      <>
        <h1 className="home-playlist-title">New Releases</h1>
        <ul className="playlist">
          {newReleases.map(genre => (
            <HomeItem key={genre.id} playListData={genre} type="album" />
          ))}
        </ul>
      </>
    )
  }

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
        {this.viewPlayList()}
      </div>
    )
  }
}

export default HomeNewReleases
