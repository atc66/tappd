import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

console.log(`${process.env.REACT_APP_MAP_API_KEY}`);

class MapContainer extends Component {
  render() {
    // const { location, auth, showActions } = this.props;

    const style = {
      width: "90%",
      height: "500px"
    };
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 22,
          lng: 22
        }}
        zoom={15}
        onClick={this.onMapClicked}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h2>NEw map</h2>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAP_API_KEY}`
})(MapContainer);
