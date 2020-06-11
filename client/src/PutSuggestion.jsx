import React, { Component } from "react";
import { Link } from "@reach/router";

class PutSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      signatures: "",
    };
  }

  componentDidMount() {
    const suggestion = this.props.getSuggestion(this.props.suggestionId);

    if (suggestion) {
      this.setState({ id: suggestion._id });
      this.setState({ title: suggestion.title });
      this.setState({ description: suggestion.description });
      this.setState({ signatures: suggestion.signatures });
    }
  }

  onSubmitSuggestionHandler = () => {
    this.props.submitSuggestion(
      this.state.id,
      this.state.title,
      this.state.description
    );
  };

  onInputSuggestionHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const suggestion = this.props.getSuggestion(this.props.suggestionId);

    let content = <p>Loading suggestion...</p>;

    if (suggestion) {
      content = (
        <React.Fragment>
          <form>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="New suggestion title..."
                name="title"
                value={this.state.title}
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
                value={this.state.description}
                onChange={(event) => this.onInputSuggestionHandler(event)}
              />
            </div>
            <button
              className="btn btn-dark"
              onClick={(suggestion) => this.onSubmitSuggestionHandler()}
            >
              Save suggestion
            </button>
          </form>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/admin-page">
          <button className="btn btn-dark">Back</button>
        </Link>

        <h2>Edit suggestion</h2>
        {content}
      </React.Fragment>
    );
  }
}

export default PutSuggestion;
