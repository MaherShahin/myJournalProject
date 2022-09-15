import React from "react";
import { Modal } from "react-bootstrap";
import { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./journalEntryModal.css";

export default class JournalEntryModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      entry: {
        title: "Generic Title",
        content: "Generic Content",
        id: null
      },
      isEditing: false,
      entryChanged: false,
    };
    
  }

  componentDidUpdate() {
    if (
      this.props.entry == null ||
      this.props.entry.content == this.state.entry.content ||
      this.state.isEditing
    ) {
      return;
    }
    this.setState({ entry: this.props.entry });
  }

  handleEditing() {
    this.setState({ isEditing: true });
    console.log("handleEditing");
    console.log(this.state.isEditing);
  }

  render() {
    if (this.state.isEditing == true) {
      return (
        <div>
          <Modal
            show={this.props.show}
            onHide={() => {
              this.props.closeModal();
              setTimeout(() => {
                this.setState({ isEditing: false });
                // to fix bug where modal changes back to viewing mode and then closes
                // due to animation
              }, 300);
            }}
            size="lg"
            aria-labelledby="example-modal-sizes-title-xl"
            dialogClassName="modal-90w"
             style={{ width: "90%"}}
          >
          
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.entry.title}
                  onChange={(e) =>
                    this.setState({
                      entry: { ...this.state.entry, title: e.target.value },
                    })
                  }
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control"
                id="content"
                rows="50"
                value={this.state.entry.content}
                onChange={(e) =>
                  this.setState({
                    entry: { ...this.state.entry, content: e.target.value },
                  })
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.props.closeModal();
                  this.setState({ isEditing: false });
                }}
              >
                Close without saving
              </Button>
              <Button
                onClick={() => {
                  this.props.closeModal();
                  this.setState({ isEditing: false });
                  this.props.handleEditSubmit(this.state.entry);
                }}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Modal
            className="fade modal-90w"
            show={this.props.show}
            onHide={() => {
              setTimeout(() => {
                this.setState({ isEditing: false });
                // to fix bug where modal changes back to viewing mode and then closes
                // due to animation
              }, 300);
              this.props.closeModal();
            }}
            animation={true}
            aria-labelledby="example-modal-sizes-title-xl"
            dialogClassName="modal-90w"
            onClick={() => this.handleEditing()}

          >
            <Modal.Header closeButton>
              <Modal.Title>{this.state.entry.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.entry.content}</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}> Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}
