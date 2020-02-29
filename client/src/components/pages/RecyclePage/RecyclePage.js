import React, { Component } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import Card from '../../Card/Card.js';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';
import MapPin from '../../MapPin/MapPin';

import 'mapbox-gl/dist/mapbox-gl.css';
import './RecyclePage.css';

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
             <MapPin
               data={this.props.facilities}
               onClick={this.props.openModalHandler}
               />
          </ReactMapGL>
        </div>
        <div className="RecyclePage-Cards">
          {this.props.facilities.map((facility, index)=>(
            <React.Fragment>
            {(this.props.facilityDetails!==null)?
            (<Modal
                show={this.props.facilityModal}
                onCancel={this.props.closeModalHandler}
                header={facility.description}
                footerClass="modal__footer__button_right"
                footer={<Button onClick={this.props.closeModalHandler}>CLOSE</Button>}>
                <div>
                  <ul style={{ listStyleType: "none" }}>
                   <li><strong>Phone:</strong> {this.props.facilityDetails.phone}</li>
                   <li><strong>Hours:</strong>  {this.props.facilityDetails.hours}</li>
                   <li><strong>URL:</strong> {this.props.facilityDetails.url ? this.props.facilityDetails.url : "N/A"}</li>

                  </ul>
                   <p>Note: {this.props.facilityDetails.notes_public ? this.props.facilityDetails.notes_public : "N/A" }</p>
                </div>

               </Modal>):(null)}
          <Card
              key={index}
              facility={facility}
              name={facility.description}
              distance={facility.distance}
              _onClickCard={this.props._onClickCard}
              openModalHandler={()=>this.props.openModalHandler(facility.location_id)}
              onMouseOver={this.props.onMouseOver}
              onMouseOut={this.props.onMouseOut}
              />
            </React.Fragment>
            ))}
      </div>
    </div>
    );
  }
}

export default RecyclePage;
