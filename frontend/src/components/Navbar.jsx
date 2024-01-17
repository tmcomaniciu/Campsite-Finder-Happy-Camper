import "../Navbar.css";

const NavBar = () => {
  return (
    <div class="topnav">
      <a class="active" href="#home">
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
