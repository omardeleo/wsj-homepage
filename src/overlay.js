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
      views.charAt(views.length - 1) === "0" ? views = views.substring(0, views.length -2) : views;
      return `${views}K`;
    }
    return views;
  }

  render() {
    let date = new Date(this.props.date);
    const options = {month: "short", day: "2-digit"}
    const {rating, views, mode} = this.props;
    date = date.toLocaleString('en-EN', options).toUpperCase();
    let titleViews = `${views.toLocaleString('en-EN')} Views`;
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
        <Rating rating={rating} mode={mode}/>
        <div className="views" title={titleViews}>{this.viewsFormatter(views)}</div>
      </div>
    </div>;
  }
};

export default Overlay;
