import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Rating extends Component {
  constructor(props) {
    super(props);
  }


  render() {
  const {rating, mode}  = this.props;
  let starWidth = mode === 330 ? Math.round((rating / 5) * 73) : null;
  let starStyle = { width: starWidth};
  let title = `Avg Rating: ${rating}`;

      return <div className="rating" title={title}>
        <div className="stars-yellow" style={starStyle}>
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
