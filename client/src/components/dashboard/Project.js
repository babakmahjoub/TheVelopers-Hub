import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/profile';

const Project = ({ project, deleteProject }) => {
  const showProject = project.map(proj => (
    <tr key={proj._id}>
      <td>{proj.projectName}</td>
      <a href={proj.linkTo} target='_blank' rel='noopener noreferrer'>
        <td>
          <span className='hide-sm'>{proj.linkTo}</span> <i className='fas fa-external-link-alt'></i>
        </td>
      </a>

      <td>
        <button onClick={() => deleteProject(proj._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>List of Projects</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Project Name</th>
            <th className='hide-sm'>Link to Website</th>
          </tr>
        </thead>
        <tbody>{showProject}</tbody>
      </table>
    </Fragment>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(Project);
