import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Camp from "./components/Camp";
import { useAppContext } from "./contexts/AppContext";
import AddCampsite from "./pages/AddCampsite";
import Search from "./pages/Search";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route
            path="/camp/:id"
            element={
              <Layout>
                <Camp />
              </Layout>
            }
          />
                
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
          <Route
            path="*"
            element={
              <Layout>
                <p>Home Page</p>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
