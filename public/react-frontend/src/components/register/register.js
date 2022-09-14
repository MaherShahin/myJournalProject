import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Register extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.username,
      password: this.password,
      name: this.name,
    };
    fetch("http://localhost:3001/register", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <div className="container d-flex justify-content-md-center align-items-center vh-100">
        <div className="row">
          <div className="col">
            <h1>We're glad you want to join us!</h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => (this.name = e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  onChange={(e) => (this.username = e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => (this.password = e.target.value)}
                />
              </Form.Group>

            <div className="d-flex justify-content-center my-3 flex-column">
            <Button variant="dark"  type="submit">
                Submit
              </Button>
              <p className="align-self-center my-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
