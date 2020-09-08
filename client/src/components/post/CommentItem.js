import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

function CommentItem({ postId, deleteComment, comment: { _id, text, name, avatar, user, date }, auth }) {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <div className='inline'>
          <p className='my-1'>{text}</p>
          {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
            <button onClick={e => deleteComment(postId, _id)} type='button' className='btn btn-delete'>
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>

        <p className='post-date'>
          <Moment fromNow>{date}</Moment>
        </p>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
