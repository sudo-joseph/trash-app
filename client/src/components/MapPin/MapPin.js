//Heavily influenced by example code here:
//https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/pins.js

import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';
import { ReactComponent as Pin } from '../../images/map-marker-icon.svg';

import './MapPin.css';

export default class MapPin extends PureComponent {
  render() {
    const {data, onClick} = this.props;

    return data.map((facility, index) => (
      <Marker key={`marker-${index}`} longitude={facility.longitude} latitude={facility.latitude}>
        <svg className="MapPin-Icon"
             id={facility.location_id}
             onClick={() => this.props.onClick(facility.location_id)}
             viewBox="0 0 60 100"
             enable-background="new 0 0 60 100"
        >
          <g transform="translate(50,100)"/>
          <Pin/>
        </svg>
      </Marker>
    ));
  }
}
