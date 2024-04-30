import './index.css'
import Header from '../Header'
// import Sidebar from '../Sidebar'

const HomePage = () => (
  <>
    <Header />
    <div className="home-page" data-testid="homePage">
      <div className="home-items">
        <h3>Editor&#39;s Picks</h3>
        <h3>Categories</h3>
        <h3>New Releases</h3>
      </div>
    </div>
  </>
)

export default HomePage
