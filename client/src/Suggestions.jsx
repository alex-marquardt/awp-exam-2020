import React, { Component } from "react";
import { Link } from "@reach/router";

class Suggetions extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to={`/create-suggestion`}>
          <button className="btn btn-dark" type="button">
            Create new suggestion
          </button>
        </Link>

        <h2>Suggetions</h2>
        <ul className="list-group">
          {this.props.suggestions.map((suggestion) => (
            <Link to={`/suggestions/${suggestion._id}`} key={suggestion._id}>
              <li className="list-group-item">
                {suggestion.title}
                <p>
                  <b>
                    Signatures:
                    {suggestion.signatures ? suggestion.signatures.length : 0}
                  </b>
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Suggetions;
