import React, { Component } from "react";
import { Link } from "@reach/router";

class PostSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  onSubmitSuggestionHandler = () => {
    this.props.submitSuggestion(this.state.title, this.state.description);
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

        <h2>New suggestion</h2>

        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="New suggestion title..."
              name="title"
              onChange={(event) => this.onInputSuggestionHandler(event)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              placeholder="New suggestion description..."
              name="description"
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
