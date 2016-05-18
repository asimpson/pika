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
    this.generateFavoriteButton(this.props.name);
  }
  
  componentWillReceiveProps(newProps) {
    this.generateFavoriteButton(newProps.name);
  }

  checkStore(name) {
      return store.get(this.props.store).filter(x => x === name);
  }

  favorite() {
    let favorites;

    if (this.checkStore(this.props.name).length) {
      favorites = store.get(this.props.store).filter(x => x !== this.props.name );
    } else {
      favorites = store.get(this.props.store);
      favorites.push(this.props.name);
    }

    store.set(this.props.store, favorites);
    this.generateFavoriteButton(this.props.name);
  }
  
  generateFavoriteButton(name) {
    if (this.checkStore(name).length) {
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
