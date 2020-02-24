import React, { Component } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './RecyclePage.css';

import Card from '../../Card/Card.js';
import earth from '../../../images/Earth_recycle.svg'

const TOKEN = 'pk.eyJ1IjoianJlaWQ2NTUiLCJhIjoiY2szcXdpN3kyMDY5NjNubGR6NG40NXZ6dCJ9.w2GXxmIYTWfbbSXjzR9LTg';

class RecyclePage extends Component {

  render() {
    return (
      <div className="RecyclePage">
        <div className="RecyclePage-Map">
          <ReactMapGL
                  {...this.props.viewport}
                  width="100%"
                  height="100%"
                  onViewportChange={this.props._updateViewport}
                  mapboxApiAccessToken={TOKEN}
                  mapStyle="mapbox://styles/jreid655/ck452mq2x1o2k1dnw6b76y20v"
                >
                {this.props.facilities.map((facility, index)=>(
                  (this.props.selectedFacility===facility.location_id)?
                  (<Popup
                      key={index}
                      tipSize={5}
                      anchor="top"
                      longitude={facility.longitude}
                      latitude={facility.latitude}
                      closeOnClick={false}
                      onClose={this.props.deselectFacility}
                    >
                    <div className='RecyclePage-Popup'>
                      <h1>{facility.description}</h1>
                      <p>//// TODO Replace dummy info here</p>
                     <p>Address: ""                </p>
                     <p>Contact Info: ""           </p>
                     <p>Materials Accepted: ""     </p>
                    </div>
                   </Popup>
                  ):(<Marker
                        key={index}
                        latitude={facility.latitude}
                        longitude={facility.longitude}
                        offsetTop={-10}
                        offsetLeft={-10}>
                        <img id={facility.location_id}
                             src={earth}
                             style={{height:"25px",width:"25px"}}
                             onClick={() => this.props._onClickMarker(facility)}/>
                       </Marker>
                     )))}
          </ReactMapGL>
        </div>
          <div className="RecyclePage-Cards">
            {this.props.facilities.map((facility, index)=>(
              <Card
                key={index}
                img={earth}
                facility={facility}
                name={facility.description}
                category=""
                location=""
                description=""
                contact=""
                _onClickCard={this.props._onClickCard}
                />
            ))}
        </div>
      </div>
    );
  }
}

export default RecyclePage;
