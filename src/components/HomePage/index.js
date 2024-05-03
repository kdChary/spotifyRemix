import './index.css'
import Header from '../Header'
import HomeEditorPicks from '../HomeEditors'
import Sidebar from '../Sidebar'
import HomeCategories from '../HomeCategories'
import HomeNewReleases from '../HomeNewReleases'

const HomePage = () => (
  <>
    <Header />
    <div className="home-page" data-testid="homePage">
      <Sidebar />

      <div className="home-items">
        <div>
          <HomeEditorPicks />
        </div>
        <div>
          <HomeCategories />
        </div>
        <div>
          <HomeNewReleases />
        </div>
      </div>
    </div>
  </>
)

export default HomePage
