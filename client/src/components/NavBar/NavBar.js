import React, { Component } from 'react';
import Burger from 'react-css-burger';

import './NavBar.css';

class NavBar extends Component {
  state={active:false}


  render() {

    return (
      <div className="NavBar">
        <div className="NavBar-Burger">
          <Burger
            onClick={() => this.setState({ active: !this.state.active })}
            active={this.state.active}
            burger="spin"
            color="yellow"
            hoverOpacity={0.8}
            scale={1.2}
          />
        </div>
        <div className="NavBar-Title">
          <h1 className="App-title">Trash App</h1>
        </div>
     </div>
    );
  }
}

export default NavBar;
