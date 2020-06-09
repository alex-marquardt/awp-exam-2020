import React, { Component } from "react";

class PostSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: "",
    };
  }

  onSubmitSignatureHandler = () => {
    this.props.submitSignature(this.props.suggestionId, this.state.signature);
  };

  onInputSignatureHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label className="label-margin-top">New signature:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter signature..."
              name="signature"
              onChange={(event) => this.onInputSignatureHandler(event)}
            />
          </div>

          <button
            className="btn btn-dark"
            type="button"
            onClick={(signature) => this.onSubmitSignatureHandler()}
          >
            Submit signature
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default PostSignature;
