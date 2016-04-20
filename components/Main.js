require('es6-promise').polyfill();
import React, { Component } from 'react';
import { render } from "react-dom";
import fetch from "isomorphic-fetch";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPokemon: [],
      nextPage: '',
      prevPage: ''
    }
  }

  componentDidMount() {
    fetch('http://pokeapi.co/api/v2/pokemon').then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        currentPokemon: data.results,
        nextPage: data.next
      });
    });
  }

  getThumb(link) {
    // http://pokeapi.co/media/sprites/pokemon/10.png
  }

  generatePokeList(list) {
    return list.map((x, i) => {
      const splitUrl = x.url.split('/');
      const imgString = `http://pokeapi.co/media/sprites/pokemon/${splitUrl[splitUrl.length - 2]}.png`;

      return (
        <li className="card" key={i}>
          <img alt="" src={imgString}/>
          <h2>{x.name}</h2>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="card-list">
        {this.generatePokeList(this.state.currentPokemon)}
      </ul>
    );
  }
}

render(<Main />, document.querySelectorAll('.pika')[0]);
