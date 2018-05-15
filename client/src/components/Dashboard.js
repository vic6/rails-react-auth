import React, { Component } from 'react';
import Auth from '../modules/Auth';

export default class Dashboard extends Component {
  state = { myCharacters: null, loaded: false };

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ myCharacters: res.characters, loaded: true });
        console.log(res);
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  renderCharacters = () =>
    this.state.myCharacters.map(character => (
      <div key={character.id} className="character">
        <h3>{character.name}</h3>
        <p>{character.description}</p>
      </div>
    ));
  render() {
    const { loaded } = this.state;
    return <div className="characters">{loaded ? this.renderCharacters() : <p>...Loading</p>}</div>;
  }
}
