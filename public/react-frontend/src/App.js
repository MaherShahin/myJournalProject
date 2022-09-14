import React from "react";
import "./styles.css";
import Navbar from "./components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/landingPage/landingPage";

export default class App extends React.Component {
  

  
  state = {
    users: [],
  };

  // Add a check to see if the user is logged in
  // If they are, render the journal entries
  // If they are not, render the landing page

   isLoggedIn() {
    if (localStorage.getItem("token")) {
      return <h1>Logged in</h1>;
    } else {
      return <LandingPage />;
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar name={"Hero"} />
        {this.isLoggedIn()}
      </div>
    );
  }
}
