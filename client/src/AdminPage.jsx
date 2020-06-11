import React, { Component } from "react";
import { Link } from "@reach/router";

class AdminPage extends Component {
  state = {};

  onDeleteSuggestionHandler(suggestion) {
    this.props.deleteSuggestion(suggestion._id);
  }

  render() {
    const suggestions = this.props.suggestions;
    const users = this.props.users;

    let content = <p>Please login as admin to continue...</p>;

    if (localStorage.admin === "true") {
      content = <p>Loading suggestions and users</p>;

      if (suggestions && users) {
        content = (
          <React.Fragment>
            <h2>Admin dashboard</h2>
            <br />

            <div className="row">
              <div className="col">
                <h3>Suggetions</h3>
                <ul className="list-group">
                  {suggestions.map((suggestion) => (
                    <li className="list-group-item" key={suggestion._id}>
                      <button
                        className="btn btn-dark float-right"
                        style={{ marginLeft: "5px" }}
                        onClick={() =>
                          this.onDeleteSuggestionHandler(suggestion)
                        }
                      >
                        Delete
                      </button>
                      <Link
                        to={`/suggestions/${suggestion._id}/edit`}
                        className="btn btn-dark float-right"
                      >
                        Edit
                      </Link>
                      <b>{suggestion.title}</b>
                      <p>{suggestion.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <h3>Users</h3>
                <ul className="list-group">
                  {users.map((user) => (
                    <Link to={`/users/${user._id}`} key={user._id}>
                      <li className="list-group-item" key={user._id}>
                        <div className="row">
                          <div className="col">Username: {user.username}</div>
                          <div className="col">Name: {user.name} </div>{" "}
                          <div className="col">
                            Admin:{" "}
                            {user.admin ? user.admin.toString() : "false"}
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </React.Fragment>
        );
      }
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
