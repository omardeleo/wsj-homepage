//import react, because we want to build off a React component
import React, { Component } from 'react';

class HelloWorld extends Component {

  render() {
    return <div className="header">
              <div className="ticker"></div>
            <h1>
              <img src='assets/wsj-logo.svg' />
            </h1>
          </div>;
  }
};

//this is where you can define fallbacks for any props that don't get sent
HelloWorld.defaultProps = {
  message: 'Hello World'
};

//export this, or other files can't use this
export default HelloWorld;
