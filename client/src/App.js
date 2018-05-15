import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import Auth from './modules/Auth';
import CharacterList from './components/CharacterList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

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
        console.log(res);
        Auth.authenticateToken(res.token);
        this.setState({ auth: Auth.isUserAuthenticated() });
      })
      .catch(err => console.log(err));
  };

  handleLogin = (event, data) => {
    console.log('hi');
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
          <Route exact path="/login" render={() => <LoginForm handleLogin={this.handleLogin} />} />
        </div>
      </Router>
    );
  }
}

export default App;
