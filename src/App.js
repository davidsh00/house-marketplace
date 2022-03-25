import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import NavBar from './components/NavBar'
function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Explore/>}></Route>
        <Route path='/offers' element={<Offers/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='sign-in' element={<SignIn/>}></Route>
        <Route path='sign-up' element={<SignUp/>}></Route>
        <Route path='forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/*' element={<Explore/>}></Route>
       
      </Routes>
      <div className='mb-[72px]'></div>
    </Router>
    </>
  );
}

export default App;
