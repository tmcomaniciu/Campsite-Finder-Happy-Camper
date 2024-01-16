// import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";

// const Header = () => {
//   const {isLoggedIn} = useAppContext();
//   return (
//     <div className="bg-green-800 py-6">
//       <div className="container mx-auto flex justify-between">
//         <span className="text-3xl text-white font-bold tracking-tight">
//           <Link to="/">Happy Camper</Link>
//         </span>
//         <span className="flex space-x-2">
//           {isLoggedIn ? <>
//             <Link to="/my-bookings">My bookings</Link>
//             <Link to="/my-campsites">My campsites</Link>
//             <button>Sign Out</button>
//           </>: <Link
//             to="/sign-in"
//             className="flex bg-green-900 items-center text-white px-3 font-bold hover:bg-white hover:text-green-900"
//           >
//             Sign In
//           </Link>}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

import logo from '../assets/Happy_Camper.png';

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-green-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-5xl text-white font-bold tracking-tight">
          {/* <Link to="/">Happy Camper</Link> */}
          <Link to="/">
          <img src={logo} alt="Happy Camper Logo" className="h-12" /> {/* Image used here */}
          </Link>       
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
        </span>
      </div>
    </div>
  );
};

export default Header;
