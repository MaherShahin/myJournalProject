import React from "react";
import { Spinner } from "react-bootstrap";
import Navbar from "../navbar/navbar";

export default class Loading extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container d-flex justify-content-md-center align-items-center vh-100">
          <Spinner
            animation="border"
            variant="light"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      </div>
    );
  }
}
