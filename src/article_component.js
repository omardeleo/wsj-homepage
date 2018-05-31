import React, { Component } from 'react';

//Basic Article Component
class ArticleComponent extends Component {
  constructor(props) {
    super(props);

    //initial state
    this.state = {height: null};
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  //Component Lifecycle
  //https://reactjs.org/docs/react-component.html#the-component-lifecycle
  /* DEPRECATED LIFECYCLE METHODS BELOW
  UNSAFE_componentWillMount() {
    console.log('component will mount');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
  }
  UNSAFE_componentWillUpdate() {
    console.log('component will update');
  }
  */


  static getDerivedStateFromProps(props, state) {
    console.log('get derived state from props');
    return null;
  }

  componentDidMount() {
    console.log('component did mount');
  }
  shouldComponentUpdate() {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('get snapshot before update');
    return { foo: 'bar' };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('component did update');
  }
  componentWillUnmount() {
    console.log('component will unmount');
  }

  //this fires every time a prop or state changes
  //to use any prop, use this.props.NAME_OF_PROP
  //use {} to add JS expressions
  //use className to add CSS classes
  //remember that this is not HTML!!
  //https://reactjs.org/docs/introducing-jsx.html
  onImgLoad({target:img}) {
    // console.log(img.offsetHeight);
    this.setState({height: img.offsetHeight})
  }
  render() {


    const divStyle = { height: this.state.height}

    const {headline, summary, showSummary, image} = this.props;
    const summaryDisplay = showSummary ? <div className="article-summary">{summary}</div> : "";

    return <div>
      <div className="img-container" style={divStyle}>
        <img onLoad={this.onImgLoad} className="article-image" src={image} />
      </div>
  </div>;
  }
};

//set default props here, if any
ArticleComponent.defaultProps = {};

//export so others can use
export default ArticleComponent;
