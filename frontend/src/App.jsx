import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div className="decoration-wavy">
                <p className="homepg">Home Page</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p className="homepg">Search Page</p>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <p className="homepg">Home Page</p>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
