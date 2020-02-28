import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import ReactModal from 'react-modal';
import Zip from 'react-zipcode'

import RecyclePage from './components/pages/RecyclePage/RecyclePage.js';
import Materials from './components/pages/Materials/Materials.js';
import About from './components/pages/About/About.js';
import NavBar from './components/NavBar/NavBar.js';
import Sidebar from "react-sidebar";
import Fetch from './components/Fetch/Fetch.js';
import MaterialsList from './components/pages/MaterialsList/MaterialsList';

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    userLng: -122.269883,
    userLat: 37.806767,
    userZoom : 12,
    userZip:'',
    geolocationModal: false,
    facilityModal:false,
    burger: false,
    pages: {Recycle: "/",
            Browse: "/browse/"},
    materials: [],
    selectedMaterials: [],
    facilities:[],
    selectedFacility:'',
    facilityDetails:null,
    viewport: {latitude: 37.785164,
               longitude: -122.269883,
               zoom: 14,
               bearing: 0,
               pitch: 0
              },
    sidebarOpen: false
    };
    this.toggleBurger = this.toggleBurger.bind(this);
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
  fetch('/api/facilities/earth911/facilities')
    .then((response) => {
      return response.json();
    })
    .then((facilities_data) => {
      this.setState({facilities:facilities_data.results.result})
    });

}

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

    let url = `/api/facilities/earth911/facilities/search?lat=${lat}&lng=${lng}&materials=${queryMatsString}`;

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
  fetch('/api/facilities/earth911/materials')
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

fetchFacilityDetails = (facility_id) => {
  //Fetches facilities that can service user selcted facility on this card
  let url = `/api/facilities/earth911/facilities/${facility_id}`

  let myPromise = fetch(url, {})
                    .then((response) => {
                      return response.json();
                    })
                    .then((facility_data) => {
                      console.log(facility_data);
                      this.setState({facilityDetails: facility_data.results.result[facility_id]});
                    }).then((data) => {
                      const myPromise = new Promise(function(resolve, reject) {
                         resolve();
                      });
                      return myPromise
                    });
  return myPromise
}

/////// Detail Modal ///////
openModalHander = (facility_id) => {
  console.log(facility_id)
  this.fetchFacilityDetails(facility_id)
        .then(this.setState({selectedFacility:facility_id,
                             facilityModal:true}));
}

closeModalHandler = (event) => {
  this.setState({facilityModal: false});
}


/////// Search Selector ///////
handleSearchChange = (selectedMaterials, action) => {
  if (selectedMaterials !== null && action.action !== 'clear') {
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
  this.setState({sidebarOpen: !this.state.burger})
}


/////// GeoLocation & Failure Modal ///////
enterZip = (value) => {
  this.setState({userZip:value})
  this.closeGeoLocationModal()  // Is this good or bad UX?
}

closeGeoLocationModal = () => {
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
  console.log('error fcn');
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
  const sidebarStyle = {
    sidebar: {
      color: "white",
      backgroundColor: "DarkGreen",
      fontFamily: "Arial",
      top: 100,
      zIndex: 5,
      textAlign: "center",
      width: "200px"
    }
  }

  const linkStyle = {
    textDecoration: 'none',
    color: "yellow"
  }

  const navBarProps = {
    title: "NoTrash",
    burgerStatus: this.state.burger,
    toggleFcn: this.toggleBurger,
    searchOptions: this.state.materials,
    selectedOptions: this.state.selectedMaterials,
    searchOnChange: this.handleSearchChange,
    popupInfo: this.state.facility_popup,
    onSearch: this.fetchFacilitiesSpecificMaterials,
  }

  return (
      <Sidebar
        sidebar={<>
          <Link to="/" style={linkStyle}
            onClick={this.toggleBurger}><h2 className="SideLink">Home</h2></Link>
          <Link to="/about/" style={linkStyle}
            onClick={this.toggleBurger}><h2 className="SideLink">About</h2></Link>
          <Link to="/materials/"
            style={linkStyle}
            onClick={this.toggleBurger}><h2 className="SideLink">Materials</h2></Link>
        </>}
        open={this.state.sidebarOpen}
        onSetOpen={this.toggleBurger}
        styles={sidebarStyle}
      >
        <div className="App">
          <div className="App-NavBar">

            <Switch>
              <Route exact
                    path='/'
                    render={(routeProps) => (<NavBar
                                              {...navBarProps}
                                              showSearchBar={true}
                                              >
                                            </NavBar>
                                              )}/>

              <Route
                    path='*'
                    render={(routeProps) => (<NavBar
                                              {...navBarProps}
                                              showSearchBar={false}

                                              >
                                            </NavBar>
                                              )}/>
            </Switch>

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
            <Switch>
              <Route exact path='/materials/' component={Materials}/>
              <Route exact path='/about/' component={About}/>
              <Route exact path='/test/' component={MaterialsList}/>
              <Route exact
                     path='/'
                     render={(routeProps) =>
                                (<RecyclePage {...routeProps}
                                    modal={this.state.geolocationModal}
                                    modalFcn={this.closeGeoLocationModal}
                                    facilities={this.state.facilities}
                                    viewport={this.state.viewport}
                                    _updateViewport={this._updateViewport}
                                    _onClickMarker={this._onClickMarker}
                                    _onClickCard={this._onClickCard}
                                    selectedFacility={this.state.selectedFacility}
                                    deselectFacility={this._closePopup}
                                    openModalHander={this.openModalHander}
                                    facilityModal={this.state.facilityModal}
                                    closeModalHandler={this.closeModalHandler}
                                    facilityDetails={this.state.facilityDetails}/>
                                )}/>
            </Switch>
          </div>
        </div>
      </Sidebar>
    );
  }
}

export default App;
