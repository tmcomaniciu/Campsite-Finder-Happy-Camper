import "../Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="topnav">
      <a><Link className="link" to="/">Home</Link></a>
      <a><Link className="link" to="/showcamps">Campsites</Link></a>
      <a><Link className="link" to="/newcamp">Add New Campsite</Link></a>
      <a><Link className="link" to="/showmap">Map</Link></a>
    </div>
  );
};

export default NavBar;
