import React from "react";

import "../../styles.css";

export default class JournalEntry {
  constructor() {
    this.id = 0;
    this.title = "";
    this.content = "";
    this.date = "";
    this.user = "";
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{this.title}</h1>
            <h5>{this.date}</h5>
            <p>{this.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
