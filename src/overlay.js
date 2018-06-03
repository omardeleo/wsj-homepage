import React, { Component } from 'react';
import Rating from './rating.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date(this.props.date);
    const options = {month: "short", day: "2-digit"}
    date = date.toLocaleString('en-EN', options).toUpperCase();
    return <div className="overlay">
      {this.props.headline}
      <div className="summary">
        {date} - {this.props.summary}
      </div>
      <Rating />
    </div>;
  }
};

export default Overlay;
