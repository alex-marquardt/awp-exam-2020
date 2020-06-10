import React, { Component } from "react";
import { Link } from "@reach/router";

class AdminPage extends Component {
  state = {};

  onDeleteSuggestionHandler(suggestion) {
    this.props.deleteSuggestion(suggestion._id);
  }

  render() {
    let content = (
      <React.Fragment>
        <p>Please login as admin to continue...</p>
      </React.Fragment>
    );

    if (localStorage.admin === "true") {
      content = (
        <React.Fragment>
          <h2>Admin page</h2>
          <br />

          <div className="row">
            <div className="col">
              <h3>Suggetions</h3>
              <ul className="list-group">
                {this.props.suggestions.map((suggestion) => (
                  <li className="list-group-item" key={suggestion._id}>
                    <button
                      className="btn btn-dark float-right"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onDeleteSuggestionHandler(suggestion)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-dark float-right"
                      style={{ marginLeft: "5px" }}
                    >
                      Hide
                    </button>
                    <button className="btn btn-dark float-right">Edit</button>
                    <b>{suggestion.title}</b>
                    <p>{suggestion.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              <h3>Users</h3>
              <ul className="list-group">
                {this.props.users.map((user) => (
                  <li className="list-group-item" key={user._id}>
                    <div className="row">
                      <div className="col">Username: {user.username}</div>
                      <div className="col">Name: {user.name} </div>{" "}
                      <div className="col">
                        Admin: {user.admin ? user.admin.toString() : "false"}
                      </div>
                    </div>
                    <br />
                    Suggestions:
                    <ul>
                      {this.props.suggestions.map((suggestion) => (
                        <li key={suggestion._id}>{suggestion.title}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/">
          <button className="btn btn-dark">Back</button>
        </Link>
        {content}
      </React.Fragment>
    );
  }
}

export default AdminPage;
