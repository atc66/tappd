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
    return (
      <section className="section-post-item">
        <h2>Locations</h2>
        <div className="box">
          <p>{location.name}</p>
        </div>
        <div className="box">
          <p>{location.title}</p>
          <p>{location.description}</p>
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
                Comments
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
      </section>
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
