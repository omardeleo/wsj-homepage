import React, { Component } from 'react';

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="overlay">
      {this.props.headline}
    </div>;
  }
};

//this is where you can define fallbacks for any props that don't get sent
Overlay.defaultProps = {

};

//export this, or other files can't use this
export default Overlay;
