import React, { Component } from "react";
import { Link } from "@reach/router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onSubmitLoginHandler() {
    this.props.login(this.state.username, this.state.password);
  }

  onInputLoginHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <button className="btn btn-dark">Back</button>
        </Link>

        <h3>Login</h3>
        <form>
          <div className="form-group">
            <label className="label-margin-top">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username..."
              name="username"
              onChange={(event) => this.onInputLoginHandler(event)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password..."
              name="password"
              onChange={(event) => this.onInputLoginHandler(event)}
            />
          </div>
          <button
            className="btn btn-dark"
            type="button"
            onClick={(_) => this.onSubmitLoginHandler()}
          >
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
