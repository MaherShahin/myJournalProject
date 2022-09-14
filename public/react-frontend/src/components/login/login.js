import React from "react";

import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-md-center align-items-center vh-100">
        <div className="row">
          <div className="col">
            <h1>Your journey starts here!</h1>

            <form
              className="form-signin"
              method="post"
              action="/login"
              id="form-signin"
            >
              <h2 className="form-signin-heading text-center">Please sign in</h2>

              <label for="username" className="font-weight-bold">
                Username
              </label>
              <input
                name="username"
                type="username"
                id="username"
                className="form-control"
                placeholder="Username"
                required=""

              />

              <label for="password" class="my-1 font-weight-bold">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required=""
              />

              <div className="text-center">
                <button
                  className="btn btn-lg btn-dark btn-block text-center my-2"
                  type="submit"
                >
                  Sign in
                </button>
                <br />
                <h5>Don't have an account yet? Register with us</h5>
                <Link to="/register" class="btn btn-dark my-1" role="button">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
