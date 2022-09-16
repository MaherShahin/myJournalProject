import React from "react";

export default class Error extends React.Component {
    render(props) {
        return (
            <div className="text-center my-5" style={{color:"white"}} >
                <h1 >An error has occured</h1>
                {this.props.errorMessages.map((message) => {
                    return <p>{message}</p>;
                })}

            </div>
        );
    }
}