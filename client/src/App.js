import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import RecyclePage from './components/pages/RecyclePage/RecyclePage.js';
import Browse from './components/pages/Browse/Browse.js';
import Welcome from './components/pages/Welcome/Welcome.js';
import NavBar from './components/NavBar/NavBar.js';
import Fetch from './components/Fetch/Fetch.js';
import ReactSideBar from "react-sidebar";

class App extends Component {

  state = {
    userLng: -122.269883,
    userLat: 37.806767,
    userZoom : 12,
    geolocationModal: false,
    burger: false,
    pages: {Recycle: "/",
            Browse: "/browse/"},
    materials: [{ value: 'chocolate', label: 'Chocolate' }, //// TODO Replace with real values.
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' },
             ],
    selectedMaterial: [],
    sidebarOpen: false
  }

onSetSidebarOpen(open) {
  this.setState({ sidebarOpen: open });
  console.log("setting sidebarOpen to:", this.state.sidebarOpen)
}

handleSearchChange = (selectedMaterial) => {
  console.log('hello search')
  this.setState({selectedMaterial})
}

toggleBurger = () => {
  this.setState({burger: !this.state.burger})

  this.onSetSidebarOpen(!this.state.sidebarOpen)
  console.log('sidebarOpen?', this.state.sidebarOpen)

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
  
  return (
          <div className="App">
            <div className="App-NavBar">
              <NavBar title="Trash App"
                      burgerStatus={this.state.burger}
                      toggleFcn={this.toggleBurger}
                      searchOptions={this.state.materials}
                      selectedOptions={this.state.selectedMaterial}
                      searchOnChange={this.handleSearchChange}>
              </NavBar>
              <ReactSideBar
                sidebar={<b>Sidebar content</b>}
                sidebarOpen={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                style={{ sidebar: { background: "red" }}}
              >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                  SIDEBAR MENU
                  
                </button>
              </ReactSideBar>
            </div>
            <div className="App-mainContent">
              <Switch>
                <Route exact path='/browse/' component={Browse}/>
                <Route exact
                       path='/'
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
