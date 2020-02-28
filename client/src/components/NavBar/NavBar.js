import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import Burger from 'react-css-burger';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import logo from '../../images/noTrash-logo.svg';
import logo from '../../images/greenGo-logo.svg';

import './NavBar.css';

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
          />
        </div>
        
        <div className="NavBar-Title">
          <Link to="/" className="NavTitle"><img src={logo} className="logoHeader"></img></Link>
        </div>
        {this.props.showSearchBar ?
        <div className="NavBar-Search">
          <Select
            key="search"
            closeMenuOnSelect={true}
            components={animatedComponents}
            value={this.props.selectedOptions}
            onChange={this.props.searchOnChange}
            handleChange={(selectedValue,action) => this.props.searchOnChange(selectedValue, action)}
            options={this.props.searchOptions}
            isMulti={true}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Search..."
          />
        </div>: null}

     </div>
    );
  }
}

export default NavBar;
