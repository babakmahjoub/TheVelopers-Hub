import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import { Spinner } from '../../layout/Spinner';
import { Link } from 'react-router-dom';

const SingleProject = ({ getProfileById, profile: { profile, loading }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  if (profile !== null && !loading) {
    var project = profile.project[profile.project.findIndex(proj => proj._id === match.params.proj_id)];
    var { projectName, linkTo, image, technologies, features, desc } = project;
  }

  return (
    <div>
      <Fragment>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to={`/profile/${profile.user._id}`} className='btn btn-light'>
              Back to Profile
            </Link>
            <div className='project-about bg-white p-2 my-1'>
              <h2 className='text-dark'>{projectName}</h2>
              <div className='p-1 project-image'>
                <img src={image} alt='' />
              </div>
              <a target='_blank' href={linkTo} rel='noopener noreferrer'>
                <h2 className='text-primary'>Visit Website</h2>
              </a>

              <div className='line'></div>
              <h2>About this site</h2>
              <p>{desc} </p>

              {technologies.length > 0 && (
                <Fragment>
                  <div className='line'></div>
                  <h2>Technologies used in this site</h2>
                  <p className='tags'>
                    {technologies.map((technology, index) => (
                      <div key={index} className='p-tag'>
                        <a href='#' className='tag'>
                          {technology}
                        </a>
                      </div>
                    ))}
                  </p>
                </Fragment>
              )}

              {features.length > 0 && (
                <Fragment>
                  <div className='line'></div>
                  <h2>Website Features</h2>
                  <p className='tags'>
                    {features.map((feature, index) => (
                      <div key={index} className='p-tag'>
                        <a href='#' className='tag'>
                          {feature}
                        </a>
                      </div>
                    ))}
                  </p>
                </Fragment>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

SingleProject.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(SingleProject);
