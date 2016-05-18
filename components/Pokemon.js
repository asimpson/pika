import React from 'react';

const Pokemon = (props) => {
  return (
    <li className="card">
      <img alt="" src={props.data.imgString}/>
      <h2>{props.data.name}</h2>
      {props.data.favoriteButton}
    </li>
  );
};

export default Pokemon;
