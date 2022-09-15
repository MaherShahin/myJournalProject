import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import LandingPage from "./components/landingPage/landingPage";
import "./styles.css";

export default class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}
