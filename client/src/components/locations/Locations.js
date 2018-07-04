import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LocationForm from "./LocationForm";
import LocationFeed from "./LocationFeed";
import Spinner from "../common/Spinner";
import { getLocations } from "../../actions/locationActions";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
  // Marker
} from "react-google-maps";

class Locations extends Component {
  componentDidMount() {
    this.props.getLocations();
  }

  render() {
    const { locations, loading } = this.props.location;

    let locationContent;

    if (locations === null || loading) {
      locationContent = <Spinner />;
    } else {
      locationContent = <LocationFeed locations={locations} />;
    }

    var x = document.querySelector("#demo");
    let latit;
    let longit;

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
      latit = position.coords.latitude;
      console.log(latit);

      longit = position.coords.longitude;
      console.log(longit);
      document.getElementById("latitude").value = latit;
      document.getElementById("longitudecode").value = longit;
    }

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: 39.952406, lng: -75.163678 }}
        >
          {/* <Marker position={{ lat: 39.952406, lng: -75.163678 }} /> */}
        </GoogleMap>
      ))
    );

    return (
      <section>
        <h2>First Call</h2>
        <div className="this-a-test">
          <p id="demo" />
        </div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <LocationForm />
        {locationContent}
      </section>
    );
  }
}

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  { getLocations }
)(Locations);
