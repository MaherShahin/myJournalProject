import react, { Component } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import Loading from "../loading/loading";
import "../../styles.css";
import { Link, Navigate } from "react-router-dom";
import Error from "../error/error";

export default class EntryForm extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      entry: "",
      isLoading: false,
      submitted: false,
      error: false,
      errorMessage: "",
    };
  }

  handleSubmit = this.handleSubmit.bind(this); // needed to fix issue of not being able to access state from within handleSubmit - not sure why this is the case

  handleSubmit(e) {
    e.preventDefault();

    console.log("Title: " + this.state);

    const data = {
      title: this.state.title,
      content: this.state.entry,
    };

    fetch("http://localhost:3001/addEntry", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isLoading: false, submitted: true });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage: "Error: " + err,
        });
        console.log(err);
      }
    );
  }


  componentDidMount() {
    console.log("Component mounted");
    this.setState({ isLoading: false });
    console.log(this.state);
  }



  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.submitted) {
      return <Navigate to="/journalEntries" />;
    }
    if (!document.cookie.includes("user")) {
      return <Error errorMessages={["Authentication Error"]} />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1> This is the entry form </h1>
          <Form onSubmit={(this.handleSubmit)}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="What will the title of this entry be?"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Entry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Share your thoughts.."
                onChange={(e) => this.setState({ entry: e.target.value })}
              />
            </Form.Group>
            <div className="d-flex">
              <Button
                className="my-3 justify-content-end"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              {this.state.error && (
                <p className="text-danger">{this.state.errorMessage}</p>
              )}             
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
