import React, { Component } from 'react';
import { render } from "react-dom";
import Pokemon from "./Pokemon";
import store from 'store';

export default class PokemonWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteButton: null,
    };
    this.favorite = this.favorite.bind(this);
  }
  
  componentDidMount() {
    this.generateFavoriteButton();
  }
  
  checkStore() {
    return store.get('favorites').filter(x => x === this.props.name );
  }
  
  favorite(ele) {
    let favorites;

    if (this.checkStore().length) {
      favorites = store.get('favorites').filter(x => x !== this.props.name );
    } else {
      favorites = store.get('favorites');
      favorites.push(this.props.name);
    }

    store.set('favorites', favorites);
    this.generateFavoriteButton();
  }
  
  generateFavoriteButton() {
    if (this.checkStore().length) {
      this.setState({
        favoriteButton: <button className="primary-button"
          onClick={this.favorite}>★</button>
      });
    } else {
      this.setState({
        favoriteButton: <button className="primary-button"
          onClick={this.favorite}>☆</button>
      });
    }
  }
  
  render() {
    const props = {
      imgString: this.props.imgString,
      name: this.props.name,
      favoriteButton: this.state.favoriteButton
    };

    return (
      <Pokemon data={props} />
    );
  }
}
