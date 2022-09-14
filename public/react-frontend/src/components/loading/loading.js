import React from "react";
import { Spinner } from "react-bootstrap";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="container d-flex justify-content-md-center align-items-center vh-100">
        <Spinner animation="border" variant="light"
        style={{ width: "10rem", height: "10rem" }} />
      </div>
    );
  }
}
