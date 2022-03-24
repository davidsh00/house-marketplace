import "./../styles/navbar.css";
import { Link,useLocation} from "react-router-dom";
import {FaCompass,FaUser,fatag, FaTag}from 'react-icons/fa'
const NavBar = () => {
  const location=useLocation()
  const mathRoute=(path)=>{
    if(path==location.pathname){
      return true
    }
  }
  return (
    <footer>
      <nav className="navbar">
        <div className={`nav-item ${mathRoute('/explore')?'active':''}`}>
            <Link to='explore' className="nav-link">
            <FaCompass />
            Explore
            </Link>
        </div>
        <div className={`nav-item ${mathRoute('/offers')?'active':''}`}>
            <Link to='offers' className="nav-link">
            <FaTag />
            Offers
            </Link>
        </div>
        <div className={`nav-item ${mathRoute('/profile')?'active':''}`}>
            <Link to='profile' className="nav-link">
            <FaUser />
            Profile
            </Link>
        </div>
      </nav>
    </footer>
  );
};
export default NavBar;
