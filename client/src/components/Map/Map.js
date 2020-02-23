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

    this.props.facilities.map((facility)=>{

      let coords = [facility.longitude, facility.latitude]
      console.log(coords)
      let el = document.createElement('div');
      el.className = 'Map-Marker';

      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(map);

    })

  }

  render() {

    return (<div className="Map">
      <div ref={el => this.mapContainer = el} className="Map-Container"/>
    </div>);
  }
}

export default Map;
