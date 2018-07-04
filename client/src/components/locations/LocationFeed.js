import React, { Component } from "react";
import PropTypes from "prop-types";
import LocationItem from "./LocationItem";

class LocationFeed extends Component {
  render() {
    const { locations } = this.props;
    return locations.map(location => (
      <LocationItem key={location._id} location={location} />
    ));
  }
}

LocationFeed.propTypes = {
  locations: PropTypes.array.isRequired
};

export default LocationFeed;
