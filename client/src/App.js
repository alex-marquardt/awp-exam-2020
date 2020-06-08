import React, { Component } from 'react';
import { Router, Link } from "@reach/router";
import './App.css';
import Suggetions from './Suggestions';
import Suggestion from './Suggestion';
import Login from './Login';
import PostSuggestion from './PostSuggestion';
import Auth from './Auth';

class App extends Component {
  api_url = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.Auth = new Auth(`${this.api_url}/users/authenticate`);
    this.state = {
      suggestions: []
    }
  }

  componentDidMount() {
    this.getSuggestions();
  }

  getSuggestion = (suggestionId) => this.state.suggestions.find(s => s._id === suggestionId);

  async login(username, password) {
    try {
      const resp = await this.Auth.login(username, password);
      console.log("Authentication:", resp.msg);
    } catch (e) {
      console.log("Login", e);
    }
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
        title: newSuggestion.title
      })
    });
  }

  async postSignatures(suggestionId, newSignature) {
    await this.Auth.fetch(`${this.api_url}/suggestions/${suggestionId}/signatures`, {
      method: 'POST',
      body: JSON.stringify({
        suggestionId: suggestionId,
        username: newSignature.username,
      })
    });
  }

  async onSubmitSignatureHandler(suggestionId, signature) {
    const newSignature = {
      username: signature,
    }

    await this.postSignatures(suggestionId, newSignature);
    this.getSuggestions();
  }

  async onSumbitSuggestionHandler(suggestionTitle) {
    const newSuggestion = {
      title: suggestionTitle
    }

    await this.postSuggestion(newSuggestion);
    this.getSuggestions();
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

          <Link to={`/login`}>
            <button className="btn btn-dark float-right" type="button">Login</button>
          </Link>

          <Router>
            <Suggestion path="/suggestions/:suggestionId"
              getSuggestion={(suggestionId) => this.getSuggestion(suggestionId)}
              submitSignature={(suggestionId, signature) => this.onSubmitSignatureHandler(suggestionId, signature)} />
            <Suggetions path="/" suggestions={this.state.suggestions} />
            <Login path="/login" login={(username, password) => this.login(username, password)} />
            <PostSuggestion path="/create-suggestion" submitSuggestion={(suggestion) => this.onSumbitSuggestionHandler(suggestion)} />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
