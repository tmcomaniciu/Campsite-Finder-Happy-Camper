import "../Navbar.css";

const NavBar = () => {
  return (
    <div className="topnav">
      <a className="active" href="#home">
        <p>Home</p>
      </a>
      <a href="#campsites">
        <p>Campsites</p>
      </a>
      <a href="#map">
        <p>Map</p>
      </a>
    </div>
  );
};

export default NavBar;
