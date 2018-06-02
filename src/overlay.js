import React, { Component } from 'react';
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
      <div className="rating">
        <div className="stars-yellow">
          <FontAwesomeIcon icon={['fa', 'star']} />
          <FontAwesomeIcon icon={['fa', 'star']} />
          <FontAwesomeIcon icon={['fa', 'star']} />
          <FontAwesomeIcon icon={['fa', 'star']} />
          <FontAwesomeIcon icon={['fa', 'star']} />
        </div>
        <div className="stars-empty">
          <FontAwesomeIcon icon={['far', 'star']} />
          <FontAwesomeIcon icon={['far', 'star']} />
          <FontAwesomeIcon icon={['far', 'star']} />
          <FontAwesomeIcon icon={['far', 'star']} />
          <FontAwesomeIcon icon={['far', 'star']} />
        </div>
      </div>
    </div>;
  }
};

//this is where you can define fallbacks for any props that don't get sent
Overlay.defaultProps = {

};

//export this, or other files can't use this
export default Overlay;
