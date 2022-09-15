import React from "react";
import { IoAddCircle } from "react-icons/io5";

export default class NewEntryButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="my-4 ">
        <IoAddCircle
          onClick={() => this.props.handleNewEntry()}
          size={100}
          style={{ color: "green", marginRight: "20px" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.cursor = "pointer";
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.transition = "0.5s";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "green";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.transition = "0.5s";
          }}
        />
      </div>
    );
  }
}
