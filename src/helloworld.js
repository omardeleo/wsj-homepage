//import react, because we want to build off a React component
import React, { Component } from 'react';

class HelloWorld extends Component {

  render() {

    return <div className="header-container">
            <div className="ticker">
              <div className="quotes">
                <div>DJIA25294.07 0.21%▲</div>
                <div>S&P 5002776.86 0.23%▲</div>
                <div>Nasdaq7646.34 0.15%▲</div>
                <div>U.S. 10 Yr-5/32 Yield2.939%▼</div>
                <div>Crude Oil65.68 -0.41%▼</div>
                <div>Euro1.1770 -0.25%▼</div>
              </div>
            </div>
            <div className="header">

              <h1>
                <img src='assets/wsj-logo.svg' />
              </h1>
            </div>
          </div>;
  }
};

//this is where you can define fallbacks for any props that don't get sent
HelloWorld.defaultProps = {
  message: 'Hello World'
};

//export this, or other files can't use this
export default HelloWorld;
