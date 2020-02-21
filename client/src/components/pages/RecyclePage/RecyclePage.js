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
        </ReactModal>/>

        <div className="RecyclePage-left">
          <Map
            lat={this.props.lat}
            lng={this.props.lng}
            zoom={this.props.zoom}/>
        </div>
        <div className="RecyclePage-right">
          <div>
            <Card
              img={earth}/>
            <Card
              img={earth}/>
            <Card
              img={earth}/>
          </div>
        </div>
      </div>
    );
  }
}

export default RecyclePage;
