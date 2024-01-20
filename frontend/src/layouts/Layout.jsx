import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
// import SearchBar from "../components/SearchBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <NavBar />
      {/* <div className="container mx-auto">
      <SearchBar />
      </div> */}
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
