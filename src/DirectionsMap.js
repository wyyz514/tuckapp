/*global google*/

import React from 'react';

import { compose, withProps, lifecycle } from "recompose";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

import './DirectionsMap.css';

const MapWithADirectionsRenderer = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80%`, position: "relative", top: `7%`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
    
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.userLocation.latitude, this.props.userLocation.longitude),
        destination: new google.maps.LatLng(this.props.restaurantLocation.latitude, this.props.restaurantLocation.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    userLocation={props.userLocation}
    restaurantLocation={props.restaurantLocation}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

const MapContainer = (props) => {
    
    return ( 
        <div className="map-container">
            <div className="map-close-button" onClick={props.closeHandler}></div>
            <MapWithADirectionsRenderer userLocation={props.userLocation} restaurantLocation={props.restaurantLocation} />
        </div>
    );
}

export default MapContainer;