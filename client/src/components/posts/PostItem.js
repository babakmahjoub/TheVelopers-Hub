import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  let hasLike = () => {
    if (auth.isAuthenticated && auth.user.likes.find(like => like.postId === _id)) {
      return true;
    } else return false;
  };

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <div className='inline'>
              <div>
                <button
                  disabled={!auth.isAuthenticated && 'true'}
                  type='button'
                  className='btn btn-light'
                  onClick={e => {
                    hasLike() ? removeLike(_id) : addLike(_id);
                  }}
                >
                  {hasLike() ? <i className='fas fa-thumbs-up'></i> : <i className='far fa-thumbs-up'></i>}{' '}
                  {likes.length > 0 && <span>{likes.length}</span>}
                </button>
                <Link to={`/posts/${_id}`} className='btn btn-primary'>
                  <i className='fas fa-comment-dots'></i>{' '}
                  {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
                </Link>
              </div>
              {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
                <button onClick={e => deletePost(_id)} type='button' className='btn btn-delete '>
                  <i className='fas fa-times'></i>
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
