import React, { Component } from 'react';
import { Link } from 'react-router-dom'


import './RecyclePage.css';

import Map from '../../Map/Map.js';
import Card from '../../Card/Card.js';
import earth from '../../../images/Earth_recycle.svg'


class RecyclePage extends Component {

  render() {
    return (
      <div className="RecyclePage">
          <Map
            lat={this.props.lat}
            lng={this.props.lng}
            zoom={this.props.zoom}
            facilities={this.props.facilities}/>

          <div className="RecyclePage-Cards">
            {this.props.facilities.map(facility=>(
              <Card
                img={earth}
                name={facility.description}
                category=""
                location=""
                description=""
                contact=""
                />
            ))}
        </div>
      </div>
    );
  }
}

export default RecyclePage;
