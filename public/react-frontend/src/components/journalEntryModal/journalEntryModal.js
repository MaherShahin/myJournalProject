import React from "react";
import { Modal } from "react-bootstrap";
import { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './journalEntryModal.css'

export default class JournalEntryModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      entry: {
        title: "Generic Title",
        content: "Generic Content",
      },
    };
  }

  componentDidUpdate() {
    // Component keeps updating unnecessarily
    // Pretty sure this isn't an optimal way to patch things up but it works for now -
    if (
      this.props.entry == null ||
      this.props.entry.content == this.state.entry.content
    ) {
      return;
    }
    this.setState({ entry: this.props.entry });
  }

  render() {
    return (
      <Modal
        className="fade modal-90w"
        show={this.props.show}
        onHide={this.props.closeModal}
        animation={true}
        aria-labelledby="example-modal-sizes-title-xl"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.state.entry.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.entry.content}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}> Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
