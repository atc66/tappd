import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deleteLocation,
  addLike,
  removeLike
} from "../../actions/locationActions";

// The map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class LocationItem extends Component {
  onDeleteClick(id) {
    this.props.deleteLocation(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { location, auth, showActions } = this.props;

    const Map = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={19}
          defaultCenter={{ lat: location.lat, lng: location.lng }}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        </GoogleMap>
      ))
    );

    return (
      <div className="section-post-item">
        <div className="box box-map">
          <p className="location-title">{location.title}</p>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8Ol4HL1xS8Ihdc7l1MVatyC2H8wM0hKY&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <p>
            <strong>Specials:</strong> <span>{location.description}</span>
          </p>
          {showActions ? (
            <span>
              <button
                onClick={this.onLikeClick.bind(this, location._id)}
                type="button"
                className="btn-icon"
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "btn-like": this.findUserLike(location.likes)
                  })}
                />
                <span className="badge badge-light">
                  {location.likes.length}
                </span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(this, location._id)}
                type="button"
                className="btn-icon"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link
                to={`/location/${location._id}`}
                className="btn btn-info mr-1"
              >
                Leave a Review
              </Link>
              {location.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, location._id)}
                  type="button"
                  className="btn-icon btn-delete"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

LocationItem.defaultProps = {
  showActions: true
};

LocationItem.propTypes = {
  deleteLocation: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteLocation, addLike, removeLike }
)(LocationItem);
