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
              <p class="homepg">Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p class="homepg">Search Page</p>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <p class="homepg">Home Page</p>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
