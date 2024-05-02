import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

import './index.css'
import HomeItem from '../HomeItem'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// TODO: Create a separate component for list items.

class HomeEditorPicks extends Component {
  state = {fetchStatus: apiConstant.initial, editorPicks: []}

  componentDidMount() {
    this.getEditorsPicks()
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
    imageUrl: data.icons[0].url,
  })

  retry = () => {
    this.getEditorPicks()
  }

  getEditorsPicks = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    const url = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timestamp}`
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
      const newData = data.categories.items.map(item => this.modifyData(item))

      this.setState({editorPicks: newData})
      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  renderPlayList = () => {
    const {editorPicks} = this.state

    return (
      <ul className="playlist">
        {editorPicks.map(item => (
          <HomeItem key={item.id} playListData={item} type="playlist" />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="home-editors" data-testid="homeEditors">
        <h2 className="home-playlist-title">Editor&#39;s Picks</h2>
        {this.renderPlayList()}
      </div>
    )
  }
}

export default HomeEditorPicks