import React, { Component } from 'react';
import Rating from './rating.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  viewsFormatter(views) {
    if (views > 1000000) {
      views = (views / 1000000).toFixed(2);
      while (views.charAt(views.length - 1) === "0" ||
        views.charAt(views.length - 1) === ".") {
        views = views.substring(0, views.length -1);
      }
      return `${views}M`;
    } else {
      views = (views / 1000).toFixed(1);
      if (views.charAt(views.length - 1) === "0"){
        views = views.substring(0, views.length -2);
      }
      return `${views}K`;
    }
  }

  render() {
    let date = new Date(this.props.date);
    const options = {month: "short", day: "2-digit"}
    const {rating, views, mode} = this.props;
    date = date.toLocaleString('en-EN', options).toUpperCase();
    let titleViews = `Views: ${views.toLocaleString('en-EN')}`;
    return <div className="overlay">
      <div>
        <div className="headline">
          {this.props.headline}
        </div>
        <div className="summary">
          {date} - {this.props.summary}
        </div>
      </div>
      <div className="overlay-footer">
        <div className="rating-container">
          <Rating rating={rating} mode={mode}/>
        </div>

        <div className="views" title={titleViews}><FontAwesomeIcon icon={['fa', 'eye']} /> {this.viewsFormatter(views)}</div>
        <div className="read-button" title="Read Story">READ</div>
      </div>
    </div>;
  }
};

export default Overlay;
