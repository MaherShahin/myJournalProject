import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Component } from "react";

export default class newEntryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        entry : {
            title: "",
            content: "",
        }
    };
  }

  
  render() {
    return (
      <Modal show={this.props.newEntry} onHide={this.props.closeModal} >
        <Modal.Header closeButton>
          <Modal.Title>New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={(e) => this.setState({ ...this.state, entry: { ...this.state.entry, title: e.target.value } })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                rows="10"
                placeholder="Enter content"
                onChange={(e) => this.setState({...this.state, entry: { ...this.state.entry, content: e.target.value } })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.closeModal()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.props.handleNewEntrySubmit(this.state.entry)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
