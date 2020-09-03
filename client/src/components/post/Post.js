import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';

const Post = ({ auth, getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      {auth.isAuthenticated ? (
        <CommentForm postId={post._id} />
      ) : (
        <div className='bg-primary p'>
          <h3>Discussion</h3>
        </div>
      )}

      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
