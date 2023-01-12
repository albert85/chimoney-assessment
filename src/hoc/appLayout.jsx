import NavBar from '../common/nav'
import './style.css'


const AppLayout = (Component) => () => {
  return (
    <div>
      <NavBar />
      <div className="content">
      <Component />
      </div>
    </div>
  )
}

export default AppLayout;