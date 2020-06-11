import React, { Component } from "react";
import { Link } from "@reach/router";

class UserPage extends Component {
  // finds username in suggestions object
  findSuggestions(suggestions, usernameInput) {
    const filteredSuggestions = [];

    for (
      let suggestionCount = 0;
      suggestionCount < suggestions.length;
      suggestionCount++
    ) {
      for (
        let signatureCount = 0;
        signatureCount < suggestions[suggestionCount].signatures.length;
        signatureCount++
      ) {
        if (
          suggestions[suggestionCount].signatures[signatureCount].username ===
          usernameInput
        ) {
          filteredSuggestions.push(suggestions[suggestionCount]);
        }
      }
    }
    return filteredSuggestions;
  }

  render() {
    const user = this.props.getUser(this.props.userId);
    const suggestions = this.props.suggestions;

    let content = <p>Loading user...</p>;

    if (user) {
      content = (
        <React.Fragment>
          <h2>{user.username}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col">Username: {user.username}</div>
                <div className="col">Name: {user.name} </div>{" "}
                <div className="col">
                  Admin: {user.admin ? user.admin.toString() : "false"}
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <b>Suggestion with signatures:</b>
              <ul>
                {this.findSuggestions(suggestions, user.username).map(
                  (suggestion) => (
                    <li key={suggestion._id}>{suggestion.title}</li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to={`/admin-page`} className="btn btn-dark" type="button">
          Back
        </Link>

        {content}
      </React.Fragment>
    );
  }
}

export default UserPage;
