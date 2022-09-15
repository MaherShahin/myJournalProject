import React, { Component } from "react";
import { Button, Nav } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi";
import "../../styles.css";

export default class JournalEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        key={this.props.entry._id}
        style={{ width: "25rem", height: "25rem", opacity: "0.8"  ,backgroundColor:"#212529" }}
        className="m-3"
        onClick={() => this.props.handleView(this.props.entry)}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.8";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Card.Body style={{ overflow: "hidden" }}>
          <Card.Title
            style={{ display: "flex", "justify-content": "space-between" }}
          >
            {this.props.entry.title}
            <Button
              as="div"
              variant="danger"
              style={{ "margin-right": "-15px", "margin-top": "-5px" }}
              onClick={() => this.props.handleDelete(this.props.entry)}
            >
              <HiOutlineTrash />
            </Button>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.entry.date}
          </Card.Subtitle>
          <Card.Text>{this.props.entry.content}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
