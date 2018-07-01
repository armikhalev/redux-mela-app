import React from 'react';

const Card = props =>
      <ul key={props.id} className="koyla-card">
        <li>{props.card.word}</li>
        <li>{props.card.la}</li>
        <li>{props.card.comment}</li>
        <p>---------------------------</p>
      </ul>;

export default Card;