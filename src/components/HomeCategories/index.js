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

class HomeCategories extends Component {
  state = {
    fetchStatus: apiConstant.initial,
    categoriesData: [],
  }

  componentDidMount() {
    this.getHomeCategories()
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

  getHomeCategories = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const token = Cookies.get('jwt_token')
    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    const url = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timeStamp}`
    const options = {
      method: 'GET',
      Headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = data.categories.items.map(item => this.modifyData(item))

      this.setState({categoriesData: newData, fetchStatus: apiConstant.success})
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  renderCategories = () => {
    const {categoriesData} = this.state

    return (
      <>
        <h1 className="home-playlist-title">Genres & Moods</h1>
        <ul className="playlist">
          {categoriesData.map(genre => (
            <HomeItem key={genre.id} playListData={genre} type="category" />
          ))}
        </ul>
      </>
    )
  }

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
      <div className="categories" data-testid="categories">
        {this.renderCategories()}
      </div>
    )
  }
}

export default HomeCategories
