import "./../styles/navbar.css";
import { Link } from "react-router-dom";
import {FaCompass,FaUser,fatag, FaTag}from 'react-icons/fa'
const NavBar = () => {
  return (
    <footer>
      <nav className="navbar">
        <div className="nav-item">
            <Link to='explore' className="nav-link">
            <FaCompass />
            Explore
            </Link>
        </div>
        <div className="nav-item">
            <Link to='offers' className="nav-link">
            <FaTag />
            Offers
            </Link>
        </div>
        <div className="nav-item">
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
