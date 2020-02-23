import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactMapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import Pins from './pins';

import './RecyclePage.css';

import Map from '../../Map/Map.js';
import Card from '../../Card/Card.js';
import earth from '../../../images/Earth_recycle.svg'

const TOKEN = 'pk.eyJ1IjoianJlaWQ2NTUiLCJhIjoiY2szcXdpN3kyMDY5NjNubGR6NG40NXZ6dCJ9.w2GXxmIYTWfbbSXjzR9LTg';

class RecyclePage extends Component {

  // _renderPopup() {
  //   const {popupInfo} = this.props.popupInfo;
  //
  //   return (
  //     popupInfo && (
  //       <Popup
  //         tipSize={5}
  //         anchor="top"
  //         longitude={popupInfo.longitude}
  //         latitude={popupInfo.latitude}
  //         closeOnClick={false}
  //         onClose={() => this.setState({popupInfo: null})}
  //       >
  //       <p>Placeholder info</p>
  //       </Popup>
  //     )
  //   );
  // }

  render() {
    return (
      <div className="RecyclePage">
        <div class="RecyclePage-Map">
          <ReactMapGL
                  {...this.props.viewport}
                  width="100%"
                  height="100%"
                  onViewportChange={this.props._updateViewport}
                  mapboxApiAccessToken={TOKEN}
                >
          </ReactMapGL>
        </div>
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
