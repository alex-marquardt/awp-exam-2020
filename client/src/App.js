import React, { Component } from 'react';
import { Router, Link, navigate } from "@reach/router";
import './App.css';
import Suggetions from './Suggestions';
import Suggestion from './Suggestion';
import Login from './Login';
import PostSuggestion from './PostSuggestion';
import Auth from './Auth';
import CreateUser from './CreateUser';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import PutSuggestion from './PutSuggestion';

class App extends Component {
  api_url = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.Auth = new Auth(`${this.api_url}/users`);
    this.state = {
      suggestions: [],
      loggedIn: this.Auth.loggedIn(),
      alert: { message: "", show: false },
      users: []
    }
  }

  componentDidMount() {
    this.getSuggestions();
    this.getUsers();
  }

  getSuggestion = (suggestionId) => this.state.suggestions.find(suggestion => suggestion._id === suggestionId);
  getUser = (userId) => this.state.users.find(user => user._id === userId)

  renderAlert(title, body) {
    const newAlert = {
      message:
        <div className="alert alert-info"><strong>{title}: </strong>{body}.<p className="float-right" style={{ cursor: "pointer" }} onClick={() => this.resetAlert()}>&times;</p></div>,
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
    navigate("/")
  }

  async getUsers() {
    const response = await this.Auth.fetch(`${this.api_url}/users`);
    const data = await response.json();
    await this.setState({ users: data });
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
        name: localStorage.name
      })
    });
  }

  async putSuggestionHandler(newSuggestion) {
    await this.Auth.fetch(`${this.api_url}/suggestions`, {
      method: 'PUT',
      body: JSON.stringify({
        id: newSuggestion.id,
        title: newSuggestion.title,
        description: newSuggestion.description,
        hide: newSuggestion.hide
      })
    });
  }

  async deleteSuggestion(deleteSuggestion) {
    await this.Auth.fetch(`${this.api_url}/suggestions`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: deleteSuggestion.id
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

  async createUserHandler(username, password, name) {
    try {
      await this.Auth.createUser(username, password, name);
      this.getUsers();

      this.renderAlert("Sign up success", `${username} is created`)
    } catch (error) {
      this.renderAlert("Sign up failed", error.message)
    }
  }

  async onSumbitSuggestionHandler(title, description) {
    const newSuggestion = {
      title: title,
      description: description
    }
    await this.postSuggestion(newSuggestion);
    this.getSuggestions();
  }

  async onEditSuggestionHandler(suggestionId, title, description, hide) {
    const newSuggestion = {
      id: suggestionId,
      title: title,
      description: description,
      hide: hide
    }

    await this.putSuggestionHandler(newSuggestion);
    this.getSuggestions();
  }

  async onDeleteSuggestionHandler(id) {
    const deleteSuggestion = {
      id: id
    }

    await this.deleteSuggestion(deleteSuggestion);
    this.getSuggestions();
  }

  async onSubmitSignatureHandler(suggestionId, signature) {

    if (localStorage.name !== signature) { // check if input name and logged in name match
      this.renderAlert("Signature error", "Signature doesn't match")
    }
    else if (this.state.suggestions.find((suggestion) => suggestion._id === suggestionId).signatures.find((sig) => sig.name === signature)) { // check if username is already added to suggestion
      this.renderAlert("Signature error", "Your signature is already added")
    }
    else {
      const newSignature = {
        name: signature,
        username: localStorage.username
      }

      try {
        await this.postSignatures(suggestionId, newSignature);
        this.getSuggestions();
        this.renderAlert("Adding signature success", `${signature} is added`)
      } catch (error) {
        this.renderAlert("Adding signature failed", error.message)
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-header">
          <div className="container-fluid">
            <Link to="/"><h1>Suggetions Exam App</h1></Link>
          </div>
        </div>
        <div className="container">

          {this.state.loggedIn ?
            <React.Fragment>
              <button className="btn btn-dark float-right" type="button" style={{ marginLeft: "5px" }} onClick={(_) => this.logout()}>Log out: {localStorage.username}</button>
              {localStorage.admin === "true" ?
                <div className="btn-group float-right" role="group">
                  <Link to={`/admin-page`} type="button" className="btn btn-dark float-right">Admin page</Link>
                </div>
                :
                <React.Fragment></React.Fragment>}
            </React.Fragment>
            :
            <React.Fragment>
              <Link to={`/login`} type="button" className="btn btn-dark float-right" style={{ marginLeft: "5px" }}>Login</Link>
              <Link to={`/sign-up`} type="button" className="btn btn-dark float-right">Sign up</Link>
            </React.Fragment>
          }

          <Router>
            <Suggetions path="/"
              suggestions={this.state.suggestions} />

            <Suggestion path="/suggestions/:suggestionId"
              getSuggestion={(suggestionId) => this.getSuggestion(suggestionId)}
              submitSignature={(suggestionId, signature) => this.onSubmitSignatureHandler(suggestionId, signature)} />

            <Login path="/login"
              login={(username, password) => this.login(username, password)} />

            <CreateUser path="/sign-up"
              submitNewUser={(username, password, name) => this.createUserHandler(username, password, name)} />

            <PutSuggestion path="/suggestions/:suggestionId/edit"
              getSuggestion={(suggestionId) => this.getSuggestion(suggestionId)}
              submitSuggestion={(suggestionId, title, description, hide) => this.onEditSuggestionHandler(suggestionId, title, description, hide)} />

            <PostSuggestion path="/create-suggestion"
              submitSuggestion={(title, description) => this.onSumbitSuggestionHandler(title, description)} />

            <AdminPage path="/admin-page"
              suggestions={this.state.suggestions}
              users={this.state.users}
              deleteSuggestion={(suggestionId) => this.onDeleteSuggestionHandler(suggestionId)} />

            <UserPage path="/users/:userId"
              suggestions={this.state.suggestions}
              getUser={(userId) => this.getUser(userId)} />
          </Router>

          {this.state.alert.show ? this.state.alert.message : <></>}

        </div>
      </React.Fragment >
    );
  }
}

export default App;
