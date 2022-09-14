import React, { Component } from "react";
import { Button, Nav } from "react-bootstrap";
import "../../styles.css";
import JournalEntry from "../journalEntry/journalEntry";
import Navbar from "../navbar/navbar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import JournalEntryModal from "../journalEntryModal/journalEntryModal";
import { Modal } from "react-bootstrap";
import Loading from "../loading/loading";

export default class JournalEntries extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isViewingEntry: false,
      entryToBeViewed: null,
      isLoading: true,
    };
  }

  async handleDelete(entry) {
    this.setState({ isLoading: true });
    const response = await fetch(
      "http://localhost:3001/deleteEntry/" + entry._id,
      {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    const data = await response.json();
    this.getJournalEntries();
  }

  async handleView(entry) {
    await this.setState({ entryToBeViewed: entry });
    this.openModal();
  }

  openModal = () => this.setState({ isViewingEntry: true });

  closeModal = () => this.setState({ isViewingEntry: false });

  async getJournalEntries() {
    const response = await fetch("http://localhost:3001/journalEntries", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    });
    const data = await response.json();
    this.setState({ entries: data.journalEntries, isLoading: false });
  }

  componentDidMount() {
    this.getJournalEntries();
  }

  componentDidUpdate() {
    this.getJournalEntries();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Navbar />
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 style={{ color: "white" }}>Journal Entries</h1>
            </div>
          </div>
          <div className="d-flex row ">
            <JournalEntryModal
              closeModal={this.closeModal}
              entry={this.state.entryToBeViewed}
              show={this.state.isViewingEntry}
            />

            {this.state.entries.map((entry) => {
              return (
                <Card
                  key={entry._id}
                  style={{ width: "25rem", height: "25rem" }}
                  className="m-3"
                >
                  <Card.Body style={{ overflow: "hidden" }}>
                    <Card.Title>{entry.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {entry.date}
                    </Card.Subtitle>
                    <Card.Text>{entry.content}</Card.Text>
                  </Card.Body>

                  <Button
                    className="btn-dark"
                    onClick={() => this.handleView(entry)}
                  >
                    View Entry
                  </Button>
                  <Button
                    className="btn danger"
                    onClick={() => this.handleDelete(entry)}
                  >
                    Delete Entry
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
