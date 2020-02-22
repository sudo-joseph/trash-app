import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import RecyclePage from './components/pages/RecyclePage/RecyclePage.js';
import Browse from './components/pages/Browse/Browse.js';
import Welcome from './components/pages/Welcome/Welcome.js';
import NavBar from './components/NavBar/NavBar.js';
import Fetch from './components/Fetch/Fetch.js';

class App extends Component {

  state = {
    userLng: -122.269883,
    userLat: 37.806767,
    userZoom : 12,
    geolocation:false,
    geolocationModal: false
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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userLng: position.coords.longitude,
        userLat: position.coords.latitude});

    }, this.catchGeoLocationError
);
  } else {
    this.openGeoLocationModal();
  }
}


render() {
  return (<div className="App">

            <NavBar className="App-navigation">

            </NavBar>

            <div className="App-mainContent">
              <Switch>
                <Route exact="exact" path='/' component={Welcome}/>
                <Route exact="exact" path='/browse/' component={Browse}/>
                <Route exact="exact"
                       path='/recycle/'
                       render={(routeProps) => (<RecyclePage {...routeProps}
                                                    lat={this.state.userLat}
                                                    lng={this.state.userLng}
                                                    zoom={this.state.userZoom}
                                                    modal={this.state.geolocationModal}
                                                    modalFcn={this.closeGeoLocationModal}/>
                                                )}/>
              </Switch>
            </div>
         </div>
        );
      }
}

export default App;
