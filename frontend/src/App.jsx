import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddCampsite from "./pages/AddCampsite";
import Search from "./pages/Search";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />

        <Route path="/search" element={<Layout>
          <Search />
        </Layout>} />

        <Route path="/register" element={<Layout><Register/></Layout>} />

        <Route path="/sign-in/" element={<Layout><SignIn /></Layout>} />
                
        {/* Add campsite logic */}
        {isLoggedIn && (
          <>
          <Route 
            path="/add-campsite" 
            element = {
              <Layout>
                <AddCampsite />
              </Layout>
            }
          />
        </>
        )} 

        <Route path="*" element={<Layout>
          <p>Home Page</p>
        </Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
