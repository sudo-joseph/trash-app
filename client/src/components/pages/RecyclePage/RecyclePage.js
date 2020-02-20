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
        <h1>Recycle Page</h1>
      </div>
    );
  }
}

export default RecyclePage;
