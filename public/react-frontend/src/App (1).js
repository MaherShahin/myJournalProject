import React from "react";
import "./styles.css";
import Navbar from "./components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/landingPage/landingPage";

export default class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}
