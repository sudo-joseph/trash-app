import React, { Component } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './RecyclePage.css';

import Card from '../../Card/Card.js';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';

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
                  (<Marker
                        key={index}
                        latitude={facility.latitude}
                        longitude={facility.longitude}
                        offsetTop={-10}
                        offsetLeft={-10}>
                        <img id={facility.location_id}
                             src={earth}
                             style={{height:"45px",width:"45px"}}
                             onClick={() => this.props.openModalHander(facility.location_id)}/>
                       </Marker>
                  ):(<Marker
                        key={index}
                        latitude={facility.latitude}
                        longitude={facility.longitude}
                        offsetTop={-10}
                        offsetLeft={-10}>
                        <img id={facility.location_id}
                             src={earth}
                             style={{height:"25px",width:"25px"}}
                             onClick={() => this.props.openModalHander(facility.location_id)}/>
                       </Marker>
                     )))}
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
              img={earth}
              facility={facility}
              name={facility.description}
              distance={facility.distance}
              _onClickCard={this.props._onClickCard}
              openModalHander={()=>this.props.openModalHander(facility.location_id)}
              />
            </React.Fragment>
            ))}
      </div>
    </div>
    );
  }
}

export default RecyclePage;
