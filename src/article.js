import React, { Component } from 'react';
import Overlay from './overlay';

//Basic Article Component
class Article extends Component {
  constructor(props) {
    super(props);

    //initial state
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.state = { overlayMarginTop: -107, imgHeight: 0, headlineMarginBottom: 64 };
  }

  //Component Lifecycle
  //https://reactjs.org/docs/react-component.html#the-component-lifecycle
  /* DEPRECATED LIFECYCLE METHODS BELOW
  UNSAFE_componentWillMount() {
    // console.log('component will mount');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('component will receive props');
  }
  UNSAFE_componentWillUpdate() {
    // console.log('component will update');
  }
  */


  static getDerivedStateFromProps(props, state) {
    // console.log('get derived state from props');
    return null;
  }

  componentDidMount() {
    // console.log('component did mount');

  }
  shouldComponentUpdate() {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    // console.log('get snapshot before update');
    return { foo: 'bar' };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('component did update');
  }
  componentWillUnmount() {
    // console.log('component will unmount');
  }

  //this fires every time a prop or state changes
  //to use any prop, use this.props.NAME_OF_PROP
  //use {} to add JS expressions
  //use className to add CSS classes
  //remember that this is not HTML!!
  //https://reactjs.org/docs/introducing-jsx.html
  showOverlay(e) {
    e.preventDefault();
    let img = document.querySelector(`.article-image-${this.props.idx}`);
    let margin = img.clientHeight === 330 ? -330 : -600;
    this.setState( {overlayMarginTop: margin, headlineMarginBottom: 0});
  }

  hideOverlay(e) {
    e.preventDefault();
    this.setState( {overlayMarginTop: -107, headlineMarginBottom: 64});
  }

  onImgLoad({target:img}) {
    this.setState({imgHeight:img.offsetHeight});
  }

  render() {
    const overlayStyle = {
        marginTop: this.state.overlayMarginTop
    };
    const {headline, summary, showSummary, image, idx, date, rating, views} = this.props;
    const summaryDisplay = showSummary ? <div className="article-summary">{summary}</div> : "";
    const imgClass = `article-image-${idx}`;
    return <div className="article" onMouseEnter={ this.showOverlay }
          onMouseLeave={ this.hideOverlay }>
            <div className="image-container">
              <img className={imgClass} src={image} onLoad={this.onImgLoad}/>
            </div>
            <div className="overlay-container" style={ overlayStyle }>
              <Overlay headline={ headline } summary={ summary } date={ date } rating={rating} mode={this.state.imgHeight} views={views} hlMargin={this.state.headlineMarginBottom}/>
            </div>
          </div>;
  }
};

export default Article;
