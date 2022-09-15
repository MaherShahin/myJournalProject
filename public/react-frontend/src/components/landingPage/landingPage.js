import React from "react";
import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Component} from "react";
import { Link, Navigate } from "react-router-dom";


export default class LandingPage extends Component {


    
    render() {
        if ( document.cookie.includes("user") ) {
            return <Navigate to="/journalEntries" />;
        } else {
        return (
        <div className="App">
            <div class="container d-flex text-center flex-column my-5">
            <h1 class="mx-5 my-5">
                Welcome to the home page!<br></br> Register or Login to move forward
            </h1>
            <Link to="/login" class="btn btn-dark w-50 align-self-center" >
                Login
            </Link>
            <br></br>
            <Link to="/register" class="btn btn-dark w-50 align-self-center" >
                Register
            </Link>
            </div>
        </div>
        );
    }
    }
}
