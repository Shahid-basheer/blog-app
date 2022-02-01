
import Single from './Pages/Single/Single'
import TopBar from './Components/TopBar/TopBar'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Settings from './Pages/Settings/Settings'
import Write from './Pages/Write/Write'
import { Route,Switch } from 'react-router'
import { Context } from './Context/Context'
import {useContext} from 'react'
import About from './Pages/About/About'
import Followers from './Pages/Followers/Followers'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import Following from './Pages/Following/Following'
import Profile from './Pages/Profile/Profile'
 const App = () => {
const {user} = useContext(Context)

  return (
    <>
      <TopBar/>
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/register' component={user? Home :Register}/>
      <Route path='/login' component={user? Home:Login}/>
      <Route path='/write' component={user? Write:Register}/>
      <Route path='/settings' component={user? Settings:Register}/>
      <Route path='/posts/:id' component={Single}/>
      <Route path='/about' component={About}/>
      <Route path='/followers' component={user?Followers:Login}/>
      <Route path='/following' component={user?Following:Login}/>
      <Route path='/profile' component={Profile}/>
      </Switch>
      <Footer/>
    </>
  )
}

export default App