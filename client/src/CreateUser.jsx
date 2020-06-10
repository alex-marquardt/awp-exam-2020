import React, { Component } from "react";
import { Link } from "@reach/router";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      admin: false,
    };
  }

  onSubmitCreateUserHandler = () =>
    this.props.submitNewUser(
      this.state.username,
      this.state.password,
      this.state.name,
      this.state.admin
    );

  onInputCreateUserHandler = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  onCheckboxCreateUserHandler = () =>
    this.setState({ admin: !this.state.admin });

  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <button className="btn btn-dark" type="button">
            Back
          </button>
        </Link>

        <h2>Create new user</h2>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
              onChange={(event) => this.onInputCreateUserHandler(event)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              onChange={(event) => this.onInputCreateUserHandler(event)}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name"
              onChange={(event) => this.onInputCreateUserHandler(event)}
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={() => this.onCheckboxCreateUserHandler()}
              />
              <label className="form-check-label">Admin user</label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => this.onSubmitCreateUserHandler()}
          >
            Create new user
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default CreateUser;
