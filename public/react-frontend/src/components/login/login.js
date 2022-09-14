import React from "react";

import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      errorMessage: "",
    };
  }


  handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: this.username,
      password: this.password,
    };
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        this.setState({ success: true });
        console.log("Login successful");
        res.json().then((data) => {
          
        });
      } else {
        console.log("Login failed");
        this.setState({ error: true });
        res = res.json();
        res.then((data) => {
          this.setState({ errorMessage: data.message });
          
        });
      }
    });
  };

  render() {
    if (this.state.success) {
      return <Navigate to="/journalEntries" />;
    }

    return (
      <div className="container d-flex justify-content-md-center align-items-center vh-100">
        <div className="row">
          <div className="col">
            <h1>Your journey starts here!</h1>
            <Form onSubmit={this.handleLogin}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control

                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => (this.username = e.target.value)}
                />
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => (this.password = e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center flex-column my-3">
                {this.state.error ? (
                  <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : null}
                <Button
                  className="w-25 align-self-center"
                  variant="dark"
                  type="submit"
                >
                  Login
                </Button>
                <h5 className="align-self-center my-3">
                  {" "}
                  No account yet? Then click here to join us!
                </h5>
                <Button
                  className="w-25 align-self-center"
                  variant="dark"
                  as={Link}
                  to="/register"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
