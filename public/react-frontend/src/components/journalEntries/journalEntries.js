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
import Error from "../error/error";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi";

export default class JournalEntries extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isViewingEntry: false,
      entryToBeViewed: null,
      isLoading: true,
      errorMessages: [],
      error: false,
      dataRetrieved: false,
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
    this.setState({ isViewingEntry: false });
  }

  async handleView(entry) {
    await setTimeout(() => {
      this.setState({ isViewingEntry: true, entryToBeViewed: entry });
      this.openModal();
    }, 100);
  }

  async handleEditSubmit(entry) {
    this.setState({ isLoading: true });
    const response = await fetch(
      "http://localhost:3001/editEntry/" + entry._id,
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(entry),
      }
    );
    const data = await response.json();
    this.getJournalEntries();
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
    if (response.status === 200) {
      const data = await response.json();
      this.setState({ entries: data.journalEntries, isLoading: false });
    } else {
      this.setState({
        errorMessages: [
          "Error: " + response.status + " " + response.statusText,
        ],
        error: true,
        isLoading: false,
      });
      console.log("Error: " + response.status + " " + response.statusText);
    }
  }

  componentDidMount() {
    this.getJournalEntries(); // BAD PRACTICE
  }

  componentDidUpdate() {}

  render() {
    if (this.state.error) {
      return (
        <div>
          <Error errorMessages={this.state.errorMessages} />
        </div>
      );
    }
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="my-3" style={{ color: "white" }}>
                Journal Entries
              </h1>
            </div>
          </div>
          <div className="d-flex row ">
            <JournalEntryModal
              closeModal={this.closeModal}
              entry={this.state.entryToBeViewed}
              show={this.state.isViewingEntry}
              handleEditSubmit={this.handleEditSubmit.bind(this)}
            />
            {this.state.entries.map((entry) => {
              return (
                <JournalEntry
                  entry={entry}
                  handleView={this.handleView.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
