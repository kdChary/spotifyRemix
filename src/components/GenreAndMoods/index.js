import {Component} from 'react'
import Cookies from 'js-cookie'

// importing self-defined components.
import './index.css'
import BackBtn from '../BackButton'
import Sidebar from '../Sidebar'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'
import GenreItem from '../GenreAndMoodsItem'

// importing utility functions.
import {apiConstant, modifyGenreAndMoods} from '../../utils/functions'

class GenreAndMoods extends Component {
  state = {
    genresList: [],
    fetchStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getGenreAndMoods()
  }

  // function to fetch specific Genre&Moods from API
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
    const data = await response.json()

    if (response.ok) {
      const validData = data.playlists.items.filter(item => item !== null)
      const newData = validData.map(eachItem => modifyGenreAndMoods(eachItem))

      this.setState({fetchStatus: apiConstant.success, genresList: newData})
      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log(`${data.error_msg}`)
    }
  }

  // JSX to display fetched Genre&Moods.
  renderGenresAndMoodsList = () => {
    const {genresList} = this.state
    const {match} = this.props
    const {params} = match
    const {playlists} = params

    return (
      <div className="categories-container" data-testid="categoriesContainer">
        <h2 className="category-name">{playlists}</h2>
        <ul className="genres-list">
          {genresList.map(genre => (
            <GenreItem key={genre.id} genreData={genre} />
          ))}
        </ul>
      </div>
    )
  }

  // Switch case to display the page states.
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
      <>
        <Sidebar />
        <div className="genre-moods-page" data-testid="genreMoodsPage">
          <BackBtn />
          {this.viewComponent()}
        </div>
      </>
    )
  }
}

export default GenreAndMoods
