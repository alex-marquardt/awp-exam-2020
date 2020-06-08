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
          <ul className="list-group">
            {suggestion.signatures.map((signature) => (
              <li className="list-group-item" key={signature._id}>
                {signature.username}
                <br />
                <i className="text-muted blockquote-footer float-right">
                  {signature.date}
                </i>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Link to="/">
          <button className="btn btn-dark">Back</button>
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
