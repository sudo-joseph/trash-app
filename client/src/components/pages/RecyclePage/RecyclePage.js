import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './RecyclePage.css';

import Map from '../../Map/Map.js';

class RecyclePage extends Component {
  state = {
    someStateVar: [],
  }

  render() {
    return (
      <div className="RecyclePage">
        <div className="RecyclePage-left">
          <Map/>
        </div>
        <div className="RecyclePage-right">
          <div>
            <p>some filler text</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RecyclePage;
