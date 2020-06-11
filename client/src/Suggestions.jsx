import React, { Component } from "react";
import { Link } from "@reach/router";

class Suggetions extends Component {
  render() {
    const suggestions = this.props.suggestions;
    const filteredSuggestions = [];

    // filter all 'hide' suggestions (can't use filter on object :-(
    if (suggestions) {
      for (let i = 0; i < suggestions.length; i++) {
        // check if user is admin
        if (localStorage.admin === "true") {
          filteredSuggestions.push(suggestions[i]);
        } else {
          if (suggestions[i].hide === false) {
            filteredSuggestions.push(suggestions[i]);
          }
        }
      }
    }

    return (
      <React.Fragment>
        <Link to={`/create-suggestion`} className="btn btn-dark" type="button">
          Create new suggestion
        </Link>

        <h2>Suggetions</h2>
        <ul className="list-group">
          {filteredSuggestions.map((suggestion) => (
            <Link to={`/suggestions/${suggestion._id}`} key={suggestion._id}>
              <li className="list-group-item">
                <i className="text-muted blockquote-footer float-right">
                  {suggestion.date}
                  <br />
                  <p className="float-right">Made by: {suggestion.name}</p>
                </i>
                <b>{suggestion.title}</b>
                <p>
                  Signatures:{" "}
                  {suggestion.signatures ? suggestion.signatures.length : 0}
                </p>
              </li>
            </Link>
          ))}
        </ul>
        <br />
      </React.Fragment>
    );
  }
}

export default Suggetions;
