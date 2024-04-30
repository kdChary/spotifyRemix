import './index.css'
import Header from '../Header'
import HomeEditorPicks from '../HomeEditors'
// import Sidebar from '../Sidebar'

const HomePage = () => (
  <>
    <Header />
    <div className="home-page" data-testid="homePage">
      <div className="home-items">
        <HomeEditorPicks />
        <h3>Categories</h3>
        <h3>New Releases</h3>
      </div>
    </div>
  </>
)

export default HomePage
