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
      <div>
        <div className="headline">
          {this.props.headline}
        </div>
        <div className="summary">
          {date} - {this.props.summary}
        </div>
      </div>
      <Rating rating={this.props.rating} mode={this.props.mode}/>
    </div>;
  }
};

export default Overlay;
