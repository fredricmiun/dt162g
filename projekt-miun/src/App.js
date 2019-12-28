import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar.component";
import Jumbotron from "./components/jumbotron.component";
import Notes from "./components/notes.component";

function App() {
  return (
    <Router>
      <div className="container-xl">
        <Navbar />
        <br />
        <Route path="/" component={Jumbotron} />
        <Route path="/" component={Notes} />
      </div>
    </Router>
  );
}

export default App;
