import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LocationItem from "../locations/LocationItem";
import CommentForm from "../location/CommentForm";
import CommentFeed from "../location/CommentFeed";
import Spinner from "../common/Spinner";
import { getLocation } from "../../actions/locationActions";

class Location extends Component {
  componentDidMount() {
    this.props.getLocation(this.props.match.params.id);
  }
  render() {
    const { location, loading } = this.props.location;
    let locationContent;

    if (location === null || loading || Object.keys(location).length === 0) {
      locationContent = <Spinner />;
    } else {
      locationContent = (
        <div>
          <LocationItem location={location} showActions={false} />
          <CommentFeed locationId={location._id} comments={location.comments} />
          <CommentForm locationId={location._id} />
        </div>
      );
    }
    return (
      <section className="row">
        <Link to="/location" className="btn">
          Back to Map
        </Link>
        {locationContent}
      </section>
    );
  }
}

Location.propTypes = {
  getLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  { getLocation }
)(Location);
