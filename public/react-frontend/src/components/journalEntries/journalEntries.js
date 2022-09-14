import React, { Component } from "react";
import { Button, Nav } from "react-bootstrap";
import "../../styles.css";
import JournalEntry from "../journalEntry/journalEntry";
import Navbar from "../navbar/navbar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import JournalEntryModal from "../journalEntryModal/journalEntryModal";
import { Modal } from "react-bootstrap";

export default class JournalEntries extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isViewingEntry: false,
      entryToBeViewed: null,
    };
  }

  async handleDelete(entry) {
    // add something to stop user from accidentaly deleting
    let newEntries = this.state.entries
    delete newEntries[entry.id-1]
    this.setState({
      entries:newEntries
    })
  }

  async handleView(entry) {
    await this.setState({ entryToBeViewed: entry });
    this.openModal();
  }

  openModal = () => this.setState({ isViewingEntry: true });

  closeModal = () => this.setState({ isViewingEntry: false });

  //async getJournalEntries() {
  //   fetch("http://localhost:8080/journalEntries")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({ entries: data });
  //     });
  // }

  //   Dummy Daata for testing
 
  getJournalEntries() {
    this.setState({
      entries: [
        {
          id: 1,
          title: "My first journal entry",
          content:
            "            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!             Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!",
          date: "2021-01-01",
          user: "user1",
        },
        {
          id: 2,
          title: "My second journal entry",
          content: "This is my second journal entry",
          date: "2021-01-02",
          user: "user1",
        },
        {
          id: 3,
          title: "My third journal entry",
          content: "This is my third journal entry",
          date: "2021-01-03",
          user: "user1",
        },
        {
          id: 4,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 5,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 6,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 7,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 8,
          title: "My first journal entry",
          content:
            "            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!             Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!            Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit provident distinctio, aspernatur, pariatur recusandae ab ut iusto numquam blanditiis deleniti eaque consequuntur, est delectus molestiae! Quo corporis enim non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam architecto, cum, illo dolor id impedit, quos alias eveniet nulla incidunt beatae sit a laboriosam. Deleniti maiores molestias sit dolore ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officia sit saepe nobis quibusdam voluptates, beatae iure provident qui cumque culpa, similique nulla modi obcaecati illo ea maiores commodi tempore voluptatibus consectetur dolorem laborum a corrupti. Consequatur, dicta sapiente repellendus officiis quam est. Dicta, veritatis nihil. Quae accusantium repellat officiis assumenda delectus! Provident quam natus alias ipsam numquam aliquam doloremque quasi, blanditiis commodi nostrum! Quaerat fuga quisquam quos deserunt dolore eaque animi saepe, impedit sapiente optio eligendi ipsam. Voluptatibus nulla magni distinctio laboriosam maxime iusto modi culpa delectus, omnis excepturi officiis, est enim sapiente molestiae quo assumenda natus, ipsum cum!",
          date: "2021-01-01",
          user: "user1",
        },
        {
          id: 9,
          title: "My second journal entry",
          content: "This is my second journal entry",
          date: "2021-01-02",
          user: "user1",
        },
        {
          id: 10,
          title: "My third journal entry",
          content: "This is my third journal entry",
          date: "2021-01-03",
          user: "user1",
        },
        {
          id: 11,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 12,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 13,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
        {
          id: 14,
          title: "My fourth journal entry",
          content: "This is my fourth journal entry",
          date: "2021-01-04",
          user: "user1",
        },
      ],
    });
  }

  componentDidMount() {
    this.getJournalEntries();
  }


  render() {
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
                  key={entry.id}
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
