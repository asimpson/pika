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
    this.fetchNewPokemon = this.fetchNewPokemon.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
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
