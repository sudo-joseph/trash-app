import React, { Component } from 'react';
import './Welcome.css';


class Welcome extends Component {
  state = {
    someStateVar: [],
  }

  render() {
    return (
      <div className="Welcome">
        <h1>Welcome</h1>
      </div>
    );
  }
}

export default Welcome;
