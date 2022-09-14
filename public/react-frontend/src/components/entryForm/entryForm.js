import react, { Component } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import "../../styles.css"

export default class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      entry: "",
      date: "",
      userId: "",
      id: "",
      isLoaded: false,
      error: null,
      entries: [],
    };
  }


  handleSubmit(e) {
    e.preventDefault()
    let newEntry = {
      title: e.title,
      content: e.content,
      date: "2021-01-04",
      user: "user1",
      id:this.props.entries.length()
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1> This is the entry form </h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="What will the title of this entry be?" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Entry</Form.Label>
              <Form.Control type="text" placeholder="Share your thoughts.." />
            </Form.Group>
      <div className="d-flex">
        
      <Button className="my-3 justify-content-end" variant="primary" type="submit">
              Submit
            </Button>
      </div>
          </Form>
        </div>
      </div>
    );
  }
}
