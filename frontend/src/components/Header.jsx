import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-green-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Happy Camper</Link>
        </span>
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/showcamps">All Campgrounds</Link>
        </span>
        {/* <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/searchcamp">Search Campgrounds</Link>
        </span> */}
        <span className="flex">
          <Link
            to="/sign-in"
            className="flex bg-green-900 items-center text-3xl text-white px-3 font-bold hover:bg-white hover:text-green-900"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;