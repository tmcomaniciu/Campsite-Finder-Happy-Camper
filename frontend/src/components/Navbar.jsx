import "../Navbar.css";

const NavBar = () => {
  return (
    <div className="topnav">
      <a className="active" href="/">
        <p>Home</p>
      </a>
      <a href="/showcamps">
        <p>Campsites</p>
      </a>
      <a href="/newcamp">
        <p>Add new Campsite</p>
      </a>
      <a href="/map">
        <p>Map</p>
      </a>
    </div>
  );
};

export default NavBar;
