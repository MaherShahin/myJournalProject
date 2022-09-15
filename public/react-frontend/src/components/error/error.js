import React from "react";

export default class Error extends React.Component {
    render(props) {
        return (
        <div>
            <h1>404 Error</h1>
            <p>Page not found.</p>
            { this.props.length > 0 ? <p>Error message: {this.props.errorMessage}</p> : null }
        </div>
        );
    }
    }