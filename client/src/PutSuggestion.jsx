import React, { Component } from "react";
import { Link } from "@reach/router";

class PutSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      hide: true,
    };
  }

  componentDidMount() {
    const suggestion = this.props.getSuggestion(this.props.suggestionId);

    if (suggestion) {
      this.setState({ id: suggestion._id });
      this.setState({ title: suggestion.title });
      this.setState({ description: suggestion.description });
      this.setState({ hide: suggestion.hide });
    }
  }

  onSubmitSuggestionHandler = () => {
    this.props.submitSuggestion(
      this.state.id,
      this.state.title,
      this.state.description,
      this.state.hide
    );
  };

  onInputSuggestionHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCheckboxHideSuggestionHandler = (event) => {
    this.setState({ hide: !this.state.hide });
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
                name="description"
                value={this.state.description}
                onChange={(event) => this.onInputSuggestionHandler(event)}
              />
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.hide}
                  onChange={(event) =>
                    this.onCheckboxHideSuggestionHandler(event)
                  }
                />
                <label className="form-check-label">Hide suggestion</label>
              </div>
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
