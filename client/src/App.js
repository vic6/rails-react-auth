import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import Auth from './modules/Auth';

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated()
  };
  render() {
    return (
      <div className="App">
        <h1>dude</h1>
      </div>
    )
  }
}

export default App;
