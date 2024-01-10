import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Camp from "./components/Camps";

const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Layout>
            <p>Home Page</p>
            <Camp />
          </Layout>} />
          <Route path="/search" element={<Layout>
            <p>Search Page</p>
          </Layout>} />
          <Route path="*" element={<Layout>
            <p>Home Page</p>
          </Layout>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
