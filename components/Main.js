import React, { Component } from 'react';
import { render } from "react-dom";
import fetch from "isomorphic-fetch";
import PokemonWrapper from "./PokemonWrapper";
import store from 'store';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPokemon: [],
      nextPage: '',
      prevPage: ''
    };
    this.fetchNewPokemon = this.fetchNewPokemon.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  setupLocalStorage() {
    if (!store.get('favorites')) {
      store.set('favorites', []);
    }
  }

  componentDidMount() {
    this.setupLocalStorage();
    fetch('http://pokeapi.co/api/v2/pokemon').then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        currentPokemon: data.results,
        nextPage: data.next
      });
    });
  }

  fetchNewPokemon(url) {
    fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        currentPokemon: data.results,
        nextPage: data.next,
        prevPage: data.previous
      });
    });
  }

  next() {
    this.fetchNewPokemon(this.state.nextPage);
  }

  prev() {
    this.fetchNewPokemon(this.state.prevPage);
  }

  generateNextButton() {
    return ( <button onClick={this.next} className="paginate-next 
      paginate">▶</button> );
  }

  generatePrevButton() {
    return ( <button onClick={this.prev} className="paginate-prev 
      paginate">◀</button> );
  }

  generatePokeList(list) {
    return list.map((x, i) => {
      const splitUrl = x.url.split('/');
      const imgString = `http://pokeapi.co/media/sprites/pokemon/${splitUrl[splitUrl.length - 2]}.png`;

      return <PokemonWrapper key={i} imgString={imgString} name={x.name} />;
    });
  }

  render() {
    return (
      <span className="main-grid">
        {this.generatePrevButton()}
        <ul className="card-list">
          {this.generatePokeList(this.state.currentPokemon)}
        </ul>
        {this.generateNextButton()}
      </span>
    );
  }
}

render(<Main />, document.querySelectorAll('.pika')[0]);
