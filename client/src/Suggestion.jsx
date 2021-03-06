import React, { Component } from "react";
import { Link } from "@reach/router";
import PostSignature from "./PostSignature";

class Suggestion extends Component {
  render() {
    const suggestion = this.props.getSuggestion(this.props.suggestionId);
    let content = <p>Loading suggestion...</p>;

    if (suggestion) {
      content = (
        <React.Fragment>
          <h2>{suggestion.title}</h2>
          <p>{suggestion.description}</p>
          <ul className="list-group">
            {suggestion.signatures.map((signature) => (
              <li className="list-group-item" key={signature._id}>
                <i className="text-muted blockquote-footer float-right">
                  {signature.date}
                  <br />
                  {localStorage.admin === "true" ? (
                    <p className="float-right">Made by: {signature.username}</p>
                  ) : (
                    <></>
                  )}
                </i>
                {signature.name}
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Link to="/" className="btn btn-dark" type="button">
          Back
        </Link>
        {content}

        <PostSignature
          submitSignature={this.props.submitSignature}
          suggestionId={this.props.suggestionId}
        />
      </React.Fragment>
    );
  }
}

export default Suggestion;
