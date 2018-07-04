import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/locationActions";

class CommentItem extends Component {
  onDeleteClick(locationId, commentId) {
    this.props.deleteComment(locationId, commentId);
  }

  render() {
    const { comment, locationId, auth } = this.props;

    return (
      <section className="section-post-item">
        <p className="box">{comment.name}</p>
        <p className="box">{comment.text}</p>
        {comment.user === auth.user.id ? (
          <button
            onClick={this.onDeleteClick.bind(this, locationId, comment._id)}
            type="button"
            className="btn-icon btn-delete"
          >
            <i className="fas fa-times" />
          </button>
        ) : null}
      </section>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  locationId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
