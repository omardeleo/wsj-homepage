import React, { Component } from 'react';

class Header extends Component {

  render() {

    return <div className="header-container">
            <div className="ticker">
              <div className="quotes">
                <div><span>DJIA 25294.07</span> 0.21%▲</div>
                <div><span>S&P 5002776.86</span> 0.23%▲</div>
                <div><span>Nasdaq 7646.34</span> 0.15%▲</div>
                <div><span>U.S. 10 Yr-5/32 Yield</span> 2.939%▼</div>
                <div><span>Crude Oil 65.68</span> -0.41%▼</div>
                <div><span>Euro 1.1770</span> -0.25%▼</div>
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

export default Header;
