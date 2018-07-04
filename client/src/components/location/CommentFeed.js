import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "../location/CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, locationId } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        locationId={locationId}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  locationId: PropTypes.string.isRequired
};

export default CommentFeed;
