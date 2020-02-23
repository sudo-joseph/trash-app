import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import Burger from 'react-css-burger';

import './NavBar.css';

class NavBar extends Component {

  render() {

    return (
      <div className="NavBar">
        <div className="NavBar-Burger">
          <Burger
            onClick={this.props.toggleFcn}
            active={this.props.burgerStatus}
            burger="spin"
            color="yellow"
            hoverOpacity={0.8}
            scale={1.2}
          />
        </div>
        {
        // <div className={(this.props.burgerStatus) ? ("NavBar-Links"):("NavBar-Links--hidden")}>
        //      {
        //        Object.entries(this.props.pages).map(([name, url]) => (
        //          <div className="NavBar-Link">
        //            <Link to={url}>{name}</Link>
        //          </div>
        //
        //        ))
        //      }
        // </div>
      }
        <div className="NavBar-Title">
          <h1 className="App-title">{this.props.title}</h1>
        </div>
     </div>
    );
  }
}

export default NavBar;
