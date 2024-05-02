import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GenreAndMoods extends Component {
  state = {
    genresList: [],
    fetchStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getGenreAndMoods()
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  getGenreAndMoods = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = data.playlists.items.map(eachItem => {
        if (eachItem !== null) {
          return {
            id: eachItem.id,
            name: this.changeName(eachItem.name),
            imageUrl: eachItem.images[0].url,
            tracks: eachItem.tracks.total,
          }
        }
        return null
      })

      this.setState({fetchStatus: apiConstant.success, genresList: newData})
      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  renderGenresAndMoodsList = () => {
    const {genresList} = this.state
    console.log(genresList)
    const {match} = this.props
    const {params} = match
    const {playlists} = params

    return (
      <div className="categories-container">
        <h2 className="category-name">{playlists}</h2>
      </div>
    )
  }

  viewComponent = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderGenresAndMoodsList()}</>

      case apiConstant.failure:
        return <Failure retry={this.getGenreAndMoods} />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="genre-moods-page" data-testid="genreMoodsPage">
        <Sidebar />
        <BackBtn />
        {this.viewComponent()}
      </div>
    )
  }
}

export default GenreAndMoods
