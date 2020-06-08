import React, { Component } from "react";
import { Link, navigate } from "@reach/router";

class PostSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: "",
    };
  }

  onSubmitSuggestionHandler = () => {
    this.props.submitSuggestion(this.state.suggestion);
    navigate("/");
  };

  onInputSuggestionHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <button className="btn btn-dark">Back</button>
        </Link>

        <h2>Create new suggestion</h2>

        <form>
          <div className="form-group">
            <label>New suggestion:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter suggestion..."
              name="suggestion"
              onChange={(event) => this.onInputSuggestionHandler(event)}
            />
          </div>
          <button
            className="btn btn-dark"
            onClick={(suggestion) => this.onSubmitSuggestionHandler()}
          >
            Submit suggestion
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default PostSuggestion;
