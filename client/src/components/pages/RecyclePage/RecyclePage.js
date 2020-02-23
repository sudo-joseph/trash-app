import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal';
// https://reactcommunity.org/react-modal/

import './RecyclePage.css';

import Map from '../../Map/Map.js';
import Card from '../../Card/Card.js';
import earth from '../../../images/Earth_recycle.svg'


class RecyclePage extends Component {

  render() {
    return (
      <div className="RecyclePage">
        <ReactModal
          isOpen={this.props.modal}
          onRequestClose={this.props.modalFcn}>
          <p>Hello Modal World</p>
        </ReactModal>

          <Map
            lat={this.props.lat}
            lng={this.props.lng}
            zoom={this.props.zoom}
            facilities={this.props.facilities}/>

          <div className="RecyclePage-Cards">
          <div>

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
      </div>
    );
  }
}

export default RecyclePage;
