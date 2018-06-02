//import react, because we want to build off a React component
import React, { Component } from 'react';

class HelloWorld extends Component {

  render() {
    return <h1>

            <img src='assets/wsj-logo.svg' />
            <p>Nothing is Free.</p>
          </h1>;
  }
};

//this is where you can define fallbacks for any props that don't get sent
HelloWorld.defaultProps = {
  message: 'Hello World'
};

//export this, or other files can't use this
export default HelloWorld;
