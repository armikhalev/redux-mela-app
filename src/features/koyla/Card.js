import React, { Component } from 'react';

export default class Card extends Component {
  static propTypes = {

  };

  render() {
    return (
      <ul key={this.props.id} className="koyla-card">
        <li>{this.props.card.word}</li>
        <li>{this.props.card.la}</li>
        <li>{this.props.card.comment}</li>
        <p>---------------------------</p>
      </ul>
    );
  }
}
