import { Link } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <div className="bg-green-800 bg-cover bg-center py-10">
    {/* <div className="bg-green-800 py-6 " > */}
      <div className="container mx-auto flex justify-between">
<<<<<<< HEAD
        <span className="text-5xl text-white font-bold tracking-tight">
          <Link to="/">Happy Camper</Link>      
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings"
                className="items-center text-black px-3 font-bold hover:bg-green-#052e16 hover:rounded-lg hover:text-white"
                >My bookings</Link>
              <Link to="/my-campsites"
                className="items-center text-black px-3 font-bold hover:bg-green-#052e16 hover:rounded-lg hover:text-white"
                >My campsites</Link>
                <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="rounded-lg flex bg-green-900 items-center text-white px-3 font-bold hover:bg-black hover:text-green-900"
            >
              Sign In
            </Link>
          )}
=======
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link className="link" to="/">
            Campsite Reservation
          </Link>
        </span>
        <span
          className="text-3xl text-white font-bold tracking-tight" //</div>className="flex space-x-2"
        >
          <Link
            className="link"
            to="/sign-in"
            //className="flex bg-green-900 items-center text-white px-3 font-bold hover:bg-white hover:text-green-900"
          >
            Sign In
          </Link>
>>>>>>> origin/main
        </span>
      </div>
    </div>
  );
};

export default Header;
