import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import Auth from './modules/Auth';
import CharacterList from './components/CharacterList';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated()
  };

  handleRegisterSubmit = (event, data) => {
    event.preventDefault();
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({ auth: Auth.isUserAuthenticated() });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/characters" render={() => <CharacterList />} />
          <Route
            exact
            path="/register"
            render={() => <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
