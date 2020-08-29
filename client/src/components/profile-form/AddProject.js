import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/profile';

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    linkTo: '',
    desc: '',
    image: '',
    technologies: '',
  });

  const { projectName, linkTo, desc, image, technologies } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={e => {
          e.preventDefault();
          addProject(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Project Name'
            name='projectName'
            value={projectName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input type='text' placeholder='Image' name='image' value={image} onChange={e => onChange(e)} />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Link to Website'
            name='linkTo'
            value={linkTo}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Technologies Used'
            name='technologies'
            value={technologies}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='desc'
            value={desc}
            onChange={e => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Project Description'
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(AddProject);
