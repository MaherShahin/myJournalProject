import React from "react";

import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "react-bootstrap";

export default class Login extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container d-flex justify-content-md-center align-items-center vh-100">
        <div className="row">
          <div className="col">
            <h1>Your journey starts here!</h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="d-flex justify-content-center flex-column my-3">
                <Button className="w-25 align-self-center" variant="dark" type="submit">
                  Login
                </Button>
                <h5 className="align-self-center my-3"> No account yet? Then click here to join us!</h5>
                <Button className="w-25 align-self-center"  variant="dark" as={Link} to="/register">
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
