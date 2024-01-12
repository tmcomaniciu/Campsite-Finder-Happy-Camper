import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Camp from "./components/Camp";
import ShowCamp from "./components/ShowCamps";
import SearchCamp from "./components/SearchCamp";

const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Layout>
            <Home />
          </Layout>} />
          {/* <Route path="/searchcamp" element={<Layout>
            <SearchCamp />
          </Layout>} /> */}
        
          <Route path="/showcamps" element={<Layout>
            <ShowCamp />
          </Layout>} />
          <Route path='/camp/:id' element={<Layout>
            <Camp />
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