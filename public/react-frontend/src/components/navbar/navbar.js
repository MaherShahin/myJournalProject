import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class customNavbar extends Component {

  handleLogout() {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        console.log("Logout successful");
        window.location.href = "http://localhost:3000/"; // redirect to home page -- didn't use Navigate here because it was causing an error and redirecting too quickly to the home page
      } else {
        console.log("Logout failed");
      }
    });
  }

  render() {
    const name = this.props.name;

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/journalEntries">
          {name}'s Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/journalEntries">
              Journal Entries
            </Nav.Link>
            <Nav.Link onClick={async () => {
              this.handleLogout();
            }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between mb-3 sticky-top">
// <a class="navbar-brand mx-3" href="#" ><%= currentUser.name %>'s Journal</a>
// <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" >
//     <span class="navbar-toggler-icon"></span>
// </button>

// <div class="collapse navbar-collapse  justify-content-end" id="navbarToggler">
//     <ul class="navbar-nav nav align-content-end">
//         <li class="nav-item nav-link active">
//             <a class="nav-link mx-2" href="/userPortal">User Portal </a>
//         </li>
//         <li class="nav-item nav-link active">
//             <a class="nav-link mx-2" href="/JournalEntries">All Entries</a>
//         </li>
//         <li class="nav-item nav-link active">
//             <a class="nav-link mx-2" href="#" onclick="handleLogout()">Logout</a>
//         </li>
//     </ul>
// </div>

// </nav>
