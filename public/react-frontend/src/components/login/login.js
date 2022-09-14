import React from "react";

import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div class="container d-flex justify-content-md-center align-items-center vh-100">
        <div class="row">
          <div class="col">
            <h1>Your journey starts here!</h1>

            <form
              class="form-signin"
              method="post"
              action="/login"
              id="form-signin"
            >
              <h2 class="form-signin-heading text-center">Please sign in</h2>

              <label for="username" class="font-weight-bold">
                Username
              </label>
              <input
                name="username"
                type="username"
                id="username"
                class="form-control"
                placeholder="Username"
                required=""
                autofocus=""
              />

              <label for="password" class="my-1 font-weight-bold">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                class="form-control"
                placeholder="Password"
                required=""
              />

              <div class="text-center">
                <button
                  class="btn btn-lg btn-dark btn-block text-center my-2"
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
