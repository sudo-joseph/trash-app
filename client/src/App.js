import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import ReactModal from 'react-modal';
import Zip from 'react-zipcode'

import RecyclePage from './components/pages/RecyclePage/RecyclePage.js';
import Browse from './components/pages/Browse/Browse.js';
import Welcome from './components/pages/Welcome/Welcome.js';
import NavBar from './components/NavBar/NavBar.js';
import SideBar from './components/SideBar/SideBar.js';
import Fetch from './components/Fetch/Fetch.js';

import './App.css';


class App extends Component {

  state = {
    userLng: -122.269883,
    userLat: 37.806767,
    userZoom : 12,
    userZip:'',
    geolocationModal: false,
    burger: false,
    pages: {Recycle: "/",
            Browse: "/browse/"},
    materials: [],
    selectedMaterials: [],
    facilities:[],
    selectedFacility:'',
    viewport: {latitude: 37.785164,
               longitude: -122.269883,
               zoom: 14,
               bearing: 0,
               pitch: 0
              },
          }


/////// Map ///////
_updateViewport = viewport => {
  this.setState({viewport});
};

_onClickMarker = facility => {
  this.setState({selectedFacility: facility.location_id});
}

_onClickCard = facility => {
  this.setState({selectedFacility: facility.location_id,
                 viewport: {latitude: facility.latitude,
                            longitude: facility.longitude,
                            zoom: 12,
                            bearing: 0,
                            pitch: 0
                          }});
}

_closePopup = () => {
  this._onClickMarker('')
}

/////// Fetch Data ///////
fetchAllFacilities = () => {
  fetch('http://localhost:8080/api/facilities/earth911/facilities')
    .then((response) => {
      return response.json();
    })
    .then((facilities_data) => {
      this.setState({facilities:facilities_data.results.result})
    });

}

/////// Fetch Data ///////
fetchFacilitiesSpecificMaterials = () => {
  //Fetches facilities that can service user selcted materials.
    let matString = "material_id[]=",
        queryMats =[],
        queryMatsString = '',
        lat = this.state.userLat,
        lng = this.state.userLng;

    this.state.selectedMaterials.map(material=> {
      queryMats.push(material.value);});
      queryMatsString = queryMats.toString()

    let url = `http://localhost:8080/api/facilities/earth911/facilities/search?lat=${lat}&lng=${lng}&materials=${queryMatsString}`;

    fetch(url,{

          })
      .then((response) => {
        return response.json();
      })
      .then((facilities_data) => {
        this.setState({facilities:facilities_data.results.result});
      });
 }


fetchMaterials = () => {
  fetch('http://localhost:8080/api/facilities/earth911/materials')
    .then((response) => {
      return response.json();
    })
    .then((materials_data) => {
      let materials = [];
      materials_data.results.result.map(material=> {
        materials.push({value:material.material_id,
                        label:material.description})
      });
      this.setState({materials:materials})
      });
}

/////// Search Selector ///////
handleSearchChange = (selectedMaterials) => {
  if (selectedMaterials !== null) {
    this.setState({selectedMaterials},
      ()=>this.fetchFacilitiesSpecificMaterials()
    )} else {
      this.setState({selectedMaterials:selectedMaterials,
                     facilities:[]})
    }
}


/////// Burger Button & Sidebar ///////
toggleBurger = () => {
  this.setState({burger: !this.state.burger})
}


/////// GeoLocation & Failure Modal ///////
enterZip = (value) => {
  this.setState({userZip:value})
  this.onModalOk()  // Is this good or bad UX?
}

onModalOk = () => {
  this.closeGeoLocationModal()
  //// TODO Update user lat lon based on API call here.

}

openGeoLocationModal = () => {
    this.setState({geolocationModal: true})
}


closeGeoLocationModal = () => {
    this.setState({geolocationModal: false})
}

catchGeoLocationError = (error) => {
  console.log('error fcn')
  switch(error.code) {
    case error.PERMISSION_DENIED:
      this.openGeoLocationModal()
      break;
    case error.POSITION_UNAVAILABLE:
      this.openGeoLocationModal()
      break;
    case error.TIMEOUT:
      console.log("Request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.")
      break;
  }
}

/////// Lifecycle Methods ///////
componentDidMount() {
if (this.state.userZip === '') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
            viewport: {latitude: position.coords.latitude,
                       longitude: position.coords.longitude,
                       zoom: 14,
                       bearing: 0,
                       pitch: 0},
            userLat: position.coords.latitude,
            userLng: position.coords.longitude,
          });

        }, this.catchGeoLocationError
      );
    } else {
        this.openGeoLocationModal();
  }}
 this.fetchMaterials();
}


render() {
  return (<div className="App">
            <div className="App-NavBar">
              <NavBar title="Trash App"
                      burgerStatus={this.state.burger}
                      toggleFcn={this.toggleBurger}
                      searchOptions={this.state.materials}
                      selectedOptions={this.state.selectedMaterials}
                      searchOnChange={this.handleSearchChange}
                      popupInfo={this.state.facility_popup}
                      onSearch={this.fetchFacilitiesSpecificMaterials}
                      >
              </NavBar>
            </div>

            <ReactModal
              isOpen={this.state.geolocationModal}
              onRequestClose={this.closeGeoLocationModal}
              className="App-Modal"
              overlayClassName="App-Overlay">
              <div className="App-Modal-Content">
                <h1>Location Error!</h1>
                <p>Unable to detect your location. Please provide your zip code
                so that we can provide local results</p>
              <h3>Enter Zip:</h3>
              <Zip onValue={(value) => {this.enterZip(value)}}/>
              </div>
              <button>OK</button>
            </ReactModal>

            <div className="App-mainContent">
              <SideBar/>
              <Switch>
                <Route exact path='/browse/' component={Browse}/>
                <Route exact
                       path='/'
                       render={(routeProps) => (<RecyclePage {...routeProps}
                                                    modal={this.state.geolocationModal}
                                                    modalFcn={this.closeGeoLocationModal}
                                                    facilities={this.state.facilities}
                                                    viewport={this.state.viewport}
                                                    _updateViewport={this._updateViewport}
                                                    _onClickMarker={this._onClickMarker}
                                                    _onClickCard={this._onClickCard}
                                                    selectedFacility={this.state.selectedFacility}
                                                    deselectFacility={this._closePopup}/>
                                                )}/>
              </Switch>
            </div>
         </div>
        );
      }
}

export default App;
