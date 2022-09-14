import React, { Component } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      errorMessage: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.username,
      password: this.password,
      name: this.name,
    };
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        this.setState({ success: true });
      } else {
        this.setState({ error: true });
        res = res.json();
        res.then((data) => {
          this.setState({ errorMessage: data.message });
        }
        );
      }
    });
  };

  // If state is success, redirect to login page
  // If state is error, display error message
  render() {
    if (this.state.success) {
      return <Navigate to="/login" />;
    }

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
                <Button variant="dark" type="submit">
                  Submit
                </Button>
                <p className="align-self-center my-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                {this.state.success && (
                  <p className="text-success text-center">
                    You have successfully registered! Please login to continue.
                  </p>
                )}
                {this.state.error && (
                  <p className="text-danger text-center">
                    {this.state.errorMessage}
                  </p>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
