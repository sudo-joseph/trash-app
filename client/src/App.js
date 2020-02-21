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
    geolocation:true,
    geolocationPermissions: false,
    geolocationModal: false
  }

toggleGeoLocationModal = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      this.setState({geolocationModal: !this.geolocationModal})
      break;
    case error.POSITION_UNAVAILABLE:
      this.setState({geolocationModal: !this.geolocationModal})
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

    }, this.toggleGeoLocationModal
);
  } else {
    this.setState({geolocationModal: true});
  }
}

  render() {
    return (
      <div className="App">
        <nav className="App-navigation">
          <h1 className="App-title">Trash App</h1>
          <Link to="/">Welcome</Link>
          <Link to="/browse/">Browse</Link>
          <Link to="/recycle/">Recycle</Link>
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/browse/' component={Browse} />
            <Route exact path='/recycle/'
                   render={(routeProps)=>(<RecyclePage {...routeProps}
                                             lat={this.state.userLat}
                                             lng={this.state.userLng}
                                             zoom={this.state.userZoom}/>)}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
