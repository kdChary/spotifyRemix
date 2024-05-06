import {Component} from 'react'
import Cookies from 'js-cookie'

// Importing self defined components.
import './index.css'
import HomeItem from '../HomeItem'
import Loading from '../LoadingPage'
import Failure from '../ErrorPage'

// importing self defined utility functions.
import {
  apiConstant,
  modifyHomeCategories,
  timeStamp,
} from '../../utils/functions'

class HomeCategories extends Component {
  state = {
    fetchStatus: apiConstant.initial,
    categoriesData: [],
  }

  componentDidMount() {
    this.getHomeCategories()
  }

  // Fetching categories from the API
  getHomeCategories = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const token = Cookies.get('jwt_token')

    const url = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timeStamp}`
    const options = {
      method: 'GET',
      Headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = data.categories.items.map(item =>
        modifyHomeCategories(item),
      )

      this.setState({categoriesData: newData, fetchStatus: apiConstant.success})
    } else {
      this.setState({fetchStatus: apiConstant.failure})
      console.log('error')
    }
  }

  // JSX to display the fetched response.
  renderCategories = () => {
    const {categoriesData} = this.state

    return (
      <>
        <ul className="playlist">
          {categoriesData.map(genre => (
            <HomeItem key={genre.id} playListData={genre} type="category" />
          ))}
        </ul>
      </>
    )
  }

  // Switch case to display the page states.
  displayComponent = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiConstant.inProgress:
        return <Loading />

      case apiConstant.success:
        return <>{this.renderCategories()}</>

      case apiConstant.failure:
        return <Failure retry={this.getHomeCategories} />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="categories" data-testid="categories">
        <h1 className="home-playlist-title">Genres & Moods</h1>
        <div className="list-container">{this.displayComponent()}</div>
      </div>
    )
  }
}

export default HomeCategories
