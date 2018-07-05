import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LocationFeed from "./LocationFeed";

import { geolocated } from "react-geolocated";

// GoogleMAP API SEARCH FEATURE
import Search from "./Search";

import Spinner from "../common/Spinner";
import { getLocations } from "../../actions/locationActions";

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

    return (
      <section>
        <h2>Happy Hours</h2>
        <div>
          {locationContent}
          <Search />
        </div>
      </section>
    );
  }
}

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  coords: PropTypes.object
};

const mapStateToProps = state => ({
  location: state.location,
  coords: state.coords
});

export default connect(
  mapStateToProps,
  { getLocations, geolocated }
)(Locations);
