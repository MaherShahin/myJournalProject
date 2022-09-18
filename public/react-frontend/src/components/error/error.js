import React from "react";
import { Link } from "react-router-dom";

export default class Error extends React.Component {
    render() {
        return (
            <div className="text-center my-5" style={{color:"white"}} >
                <h1 >An error has occured</h1>
                {this.props.errorMessages.map((message) => {
                    return <p>{message}</p>;
                })}
                {/* Navigate to home instead */}
                <Link to="/" className="btn btn-dark">Go Home Instead</Link>
            </div>
        );
    }
}