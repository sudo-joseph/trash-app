import React, {Component} from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoianJlaWQ2NTUiLCJhIjoiY2szcXdpN3kyMDY5NjNubGR6NG40NXZ6dCJ9.w2GXxmIYTWfbbSXjzR9LTg';

class Map extends Component {

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        this.props.lng, this.props.lat
      ],
      zoom: this.props.zoom
    });

    map.on('move', () => {
      this.setState({lng: map.getCenter().lng.toFixed(4),
                     lat: map.getCenter().lat.toFixed(4),
                     zoom: map.getZoom().toFixed(2)});
    });
  }

  render() {

    return (<div className="Map-Title">
      <div ref={el => this.mapContainer = el} className="mapContainer"/>
    </div>);
  }
}

export default Map;
