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
    materials: [{ value: 'chocolate', label: 'Chocolate' }, //// TODO Replace with real values.
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' },
             ],
    selectedMaterial: [],
    facilities: [{"curbside": false,
                  "description": "Elihu Harris State Building",
                  "distance": 0.1,
                  "longitude": -122.27331877704263,
                  "latitude": 37.80604715391224,
                  "location_type_id": 1,
                  "location_id": "Q1RQNVVeUldCUA",
                  "municipal": true
                },
                {
                  "curbside": false,
                  "description": "EBMUD Administration Building",
                  "distance": 0.3,
                  "longitude": -122.27085505852355,
                  "latitude": 37.80129160421266,
                  "location_type_id": 1,
                  "location_id": "Q1RQNVVfWVpKUQ",
                  "municipal": true
                },
              ]
  }

enterZip = (value) => {
  this.setState({userZip:value})
  this.onModalOk()  // Is this good or bad UX?

}

onModalOk = () => {
  this.closeGeoLocationModal()
  //// TODO Update user lat lon based on API call here.
  this.render()
}

handleSearchChange = (selectedMaterial) => {
  console.log('hello search')
  this.setState({selectedMaterial})
}

toggleBurger = () => {
  this.setState({burger: !this.state.burger})
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


componentDidMount() {
if (this.state.userZip === '') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          userLng: position.coords.longitude,
          userLat: position.coords.latitude});
        }, this.catchGeoLocationError
      );
    } else {
        this.openGeoLocationModal();
  }}
 this.fetchFacilities()
}


render() {
  return (<div className="App">
            <div className="App-NavBar">
              <NavBar title="Trash App"
                      burgerStatus={this.state.burger}
                      toggleFcn={this.toggleBurger}
                      searchOptions={this.state.materials}
                      selectedOptions={this.state.selectedMaterial}
                      searchOnChange={this.handleSearchChange}
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
                                                    lat={this.state.userLat}
                                                    lng={this.state.userLng}
                                                    zoom={this.state.userZoom}
                                                    modal={this.state.geolocationModal}
                                                    modalFcn={this.closeGeoLocationModal}
                                                    facilities={this.state.facilities}/>
                                                )}/>
              </Switch>
            </div>
         </div>
        );
      }
}

export default App;
