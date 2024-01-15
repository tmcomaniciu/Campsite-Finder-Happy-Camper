import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Camp from "./components/Camp";
import ShowCamp from "./components/ShowCamps";

const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Layout>
            <Home />
          </Layout>} />
          <Route path="/showcamps" element={<Layout>
            <ShowCamp />
          </Layout>} />
          <Route path='/camp/:id' element={<Layout>
            <Camp />
          </Layout>} />
          <Route path="*" element={<Layout>
            <Home />
          </Layout>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;