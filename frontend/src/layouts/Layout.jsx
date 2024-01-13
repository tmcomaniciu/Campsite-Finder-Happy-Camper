import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "../components/About";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
      <About />
    </div>
  );
};

export default Layout;
