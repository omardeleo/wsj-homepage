import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Rating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return <div className="rating" title="Avg Rating: 4.7">
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
      </div>;
  }
};

export default Rating;
