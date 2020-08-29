import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileProject = ({ userId, project: { projectName, image, linkTo, _id } }) => {
  return (
    <div>
      <h3>{projectName}</h3>
      <a target='_blank' href={linkTo} rel='noopener noreferrer'>
        <img src={image} alt='' />
      </a>
      <Link to={`/profile/${userId}/project/${_id}`} className='btn btn-light'>
        More
      </Link>
    </div>
  );
};

ProfileProject.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProfileProject;
