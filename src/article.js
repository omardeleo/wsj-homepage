import React, { Component } from 'react';
import Overlay from './overlay';

class Article extends Component {
  constructor(props) {
    super(props);

    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    // this.state = { overlayMarginTop: -600, imgHeight: 0, headlineMarginBottom: 0, test: true };
    this.state = { overlayMarginTop: -118, imgHeight: 0, headlineMarginBottom: 100, test: false };
  }

  showOverlay(e) {
    if (!this.state.test) {
      e.preventDefault();
      let img = document.querySelector(`.article-image-${this.props.idx}`);
      let margin = img.clientHeight === 330 ? -330 : -600;
      this.setState( {overlayMarginTop: margin, headlineMarginBottom: 0});
    }
  }

  hideOverlay(e) {
    if (!this.state.test) {
      e.preventDefault();
      let img = document.querySelector(`.article-image-${this.props.idx}`);
      let margin = img.clientHeight === 330 ? -118 : -230;
      this.setState( {overlayMarginTop: margin, headlineMarginBottom: 100});
    }
  }

  onImgLoad({target:img}) {
    this.setState({imgHeight:img.offsetHeight});
  }

  render() {
    const overlayStyle = {
        marginTop: this.state.overlayMarginTop
    };
    const {headline, summary, showSummary, image, idx, date, rating, views, link, category} = this.props
    const summaryDisplay = showSummary ? <div className="article-summary">{summary}</div> : "";
    const imgClass = `article-image-${idx}`;
    return <div className="article" onPointerMove={ this.showOverlay }
          onMouseLeave={ this.hideOverlay }>
            <div className="image-container">
              <img className={imgClass} src={image} onLoad={this.onImgLoad}/>
            </div>
            <div className="overlay-container" style={ overlayStyle }>
              <Overlay
                headline={ headline }
                summary={ summary }
                date={ date }
                rating={rating}
                mode={this.state.imgHeight}
                views={views}
                hlMargin={this.state.headlineMarginBottom}
                link={link}
                category={category}
              />
            </div>
          </div>;
  }
};

export default Article;
