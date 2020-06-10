import React, { Component } from 'react';
import { Router, Link, navigate } from "@reach/router";
import './App.css';
import Suggetions from './Suggestions';
import Suggestion from './Suggestion';
import Login from './Login';
import PostSuggestion from './PostSuggestion';
import Auth from './Auth';
import CreateUser from './CreateUser';

class App extends Component {
  api_url = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.Auth = new Auth(`${this.api_url}/users`);
    this.state = {
      suggestions: [],
      loggedIn: this.Auth.loggedIn(),
      alert: { message: "", show: false }
    }
  }

  componentDidMount() {
    this.getSuggestions();
  }

  getSuggestion = (suggestionId) => this.state.suggestions.find(s => s._id === suggestionId);

  renderAlert(title, body) {
    const newAlert = {
      message:
        <div className="alert alert-secondary"><strong>{title}: </strong>{body}<p className="float-right" style={{ cursor: "pointer" }} onClick={() => this.resetAlert()}>&times;</p></div>,
      show: true
    }
    this.setState({ alert: newAlert });
  }

  resetAlert() {
    const newAlert = { message: "", show: false }
    this.setState({ alert: newAlert });
  }

  async login(username, password) {
    try {
      await this.Auth.login(username, password);
      this.setState({ loggedIn: true });
      this.renderAlert("Login success", `${username} is logged in`)
      navigate("/")
    } catch (error) {
      this.renderAlert("Login fail", error.message)
    }
  }

  async logout() {
    this.setState({ loggedIn: false });
    await this.Auth.logout();
  }

  async getSuggestions() {
    const response = await this.Auth.fetch(`${this.api_url}/suggestions`);
    const data = await response.json();
    this.setState({ suggestions: data })
  }

  async postSuggestion(newSuggestion) {
    await this.Auth.fetch(`${this.api_url}/suggestions`, {
      method: 'POST',
      body: JSON.stringify({
        title: newSuggestion.title,
        description: newSuggestion.description,
      })
    });
  }

  async postSignatures(suggestionId, newSignature) {
    await this.Auth.fetch(`${this.api_url}/suggestions/${suggestionId}/signatures`, {
      method: 'POST',
      body: JSON.stringify({
        suggestionId: suggestionId,
        name: newSignature.name,
        username: newSignature.username,
      })
    });
  }

  async onSubmitSignatureHandler(suggestionId, signature) {
    if (localStorage.name !== signature) { // check if username and logged in username match
      this.renderAlert("Signature failed", "Your username and signature doesn't match")
    }
    else if (this.state.suggestions.find((suggestion) => suggestion._id === suggestionId).signatures.find((sig) => sig.username === signature)) { // check if username is already added to suggestion
      this.renderAlert("Signature failed", "Your signature is already added")
    }
    else {
      const newSignature = {
        name: signature,
        username: localStorage.username
      }

      await this.postSignatures(suggestionId, newSignature);
      this.getSuggestions();
      this.resetAlert();
    }
  }

  async onSumbitSuggestionHandler(title, description) {
    console.log(title, description);

    const newSuggestion = {
      title: title,
      description: description
    }

    await this.postSuggestion(newSuggestion);
    this.getSuggestions();
  }

  // create user
  async createUserHandler(username, password, name, admin) {
    try {
      await this.Auth.createUser(username, password, name, admin);
      console.log(username, password, name, admin);

      this.renderAlert("Sign up success", `${username} is now created`)
    } catch (error) {
      this.renderAlert("Sign up failed", error.message)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-header">
          <div className="container-fluid">
            <h1>Suggetions Exam App</h1>
          </div>
        </div>
        <div className="container">

          {this.state.alert.show ? this.state.alert.message : <></>}

          {this.state.loggedIn ?
            <button className="btn btn-dark float-right" type="button" onClick={(_) => this.logout()}>Log out: {localStorage.username}</button>
            : (<div className="btn-group float-right" role="group">
              <Link to={`/sign-up`} type="button" className="btn btn-dark">Sign up</Link>
              <Link to={`/login`} type="button" className="btn btn-dark">Login</Link>
            </div>)
          }

          <Router>
            <Suggestion path="/suggestions/:suggestionId"
              getSuggestion={(suggestionId) => this.getSuggestion(suggestionId)}
              submitSignature={(suggestionId, signature) => this.onSubmitSignatureHandler(suggestionId, signature)} />
            <Suggetions path="/" suggestions={this.state.suggestions} />
            <Login path="/login" login={(username, password) => this.login(username, password)} />
            <PostSuggestion path="/create-suggestion" submitSuggestion={(title, description) => this.onSumbitSuggestionHandler(title, description)} />
            <CreateUser path="sign-up"
              submitNewUser={(username, password, name, admin) => this.createUserHandler(username, password, name, admin)}
            />
          </Router>

        </div>
      </React.Fragment >
    );
  }
}

export default App;
