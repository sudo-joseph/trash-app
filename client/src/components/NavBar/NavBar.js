import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import Burger from 'react-css-burger';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './NavBar.css';
import ReactSideBar from '../ReactSideBar/ReactSideBar';

const animatedComponents = makeAnimated();


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
          >
          </Burger>
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

        <div className="NavBar-Search">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            value={this.props.selectedOptions}
            onChange={this.props.searchOnChange}
            options={this.props.searchOptions}
            isMulti={true}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

     </div>
    );
  }
}

export default NavBar;
