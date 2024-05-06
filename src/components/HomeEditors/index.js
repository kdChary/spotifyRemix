import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import HomeItem from '../HomeItem'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'

// Importing Self defined Utility functions.
import {apiConstant, modifyEditorsPicks, timeStamp} from '../../utils/functions'

class HomeEditorPicks extends Component {
  state = {fetchStatus: apiConstant.initial, editorPicks: []}

  componentDidMount() {
    this.getEditorsPicks()
  }

  // Fetching response from the API
  getEditorsPicks = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const url = `https://apis2.ccbp.in/spotify-clone/featured-playlists?country=IN&timestamp=${timeStamp}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({fetchStatus: apiConstant.success})

      const data = await response.json()
      const newData = data.playlists.items.map(item => modifyEditorsPicks(item))

      this.setState({editorPicks: newData})
      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  // JSX to render the Fetched results.
  renderPlayList = () => {
    const {editorPicks} = this.state

    return (
      <>
        <ul className="playlist">
          {editorPicks.map(item => (
            <HomeItem key={item.id} playListData={item} type="playlist" />
          ))}
        </ul>
      </>
    )
  }

  // Switch statement to display Page status.
  displayComponent = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderPlayList()}</>

      case apiConstant.failure:
        return <Failure retry={this.getEditorsPicks} />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-editors" data-testid="homeEditors">
        <h2 className="home-playlist-title">Editor&#39;s Picks</h2>
        {this.displayComponent()}
      </div>
    )
  }
}

export default HomeEditorPicks
