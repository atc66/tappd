import React, { Component } from "react";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
// import Landing from "./components/layout/Landing";

import "./App.css";
import "./grid.css";
import "./normalize.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
