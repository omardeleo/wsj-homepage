import React, { Component } from 'react';
import Overlay from './overlay';

class Article extends Component {
  constructor(props) {
    super(props);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.state = { overlayMarginTop: null,
      imgHeight: null,
      headlineMarginBottom: 100,
      test: false,
      displayOverlay: false,
      overlayHeight: 0
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.innerWidth < 480) {
      this.setState({overlayMarginTop: -230, overlayHeight: -600, imgHeight: 600});
    } else {
      this.setState({overlayMarginTop: -118, overlayHeight: -330, imgHeight: 330});
    }
  }

  toggleOverlay(e) {
    e.preventDefault();
    console.log("ok");
    const marginBottom = this.state.headlineMarginBottom === 100 ? 0 : 100;
    this.setState({displayOverlay: !this.state.displayOverlay, headlineMarginBottom: marginBottom});
  }

  onImgLoad({target:img}) {
    this.setState({imgHeight: img.offsetHeight});
  }

  marginTop() {
    return this.state.displayOverlay ? this.state.overlayHeight : this.state.overlayMarginTop;
  }

  render() {
    const {displayOverlay} = this.state;
    const overlayStyle = {marginTop: this.marginTop()}
    const {headline, summary, showSummary, image, idx, date, rating, views, link, category} = this.props
    const summaryDisplay = showSummary ? <div className="article-summary">{summary}</div> : "";
    const imgClass = `article-image-${idx}`;
    return <div className="article" onMouseEnter={ this.toggleOverlay }
          onMouseLeave={ this.toggleOverlay }>
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
