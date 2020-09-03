import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/profile';
import axios from 'axios';

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    linkTo: '',
    desc: '',
    image: '',
    technologies: '',
  });

  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const { projectName, linkTo, desc, technologies } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Projects</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any project that you have accomplished
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Project Name'
            name='projectName'
            value={projectName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='file'>Project Image</label>
          <input
            type='file'
            id='file'
            onChange={e => {
              setFile(e.target.files[0]);
            }}
          />
          <button
            className='btn btn-primary my-1'
            onClick={async e => {
              e.preventDefault();
              const data = new FormData();
              data.append('file', file);
              try {
                const res = await axios.post('api/profile/upload', data, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                const { fileName, filePath } = res.data;
                setUploadedFile({ fileName, filePath });
                setFormData({ ...formData, image: res.data.filePath });
              } catch (err) {
                if (err.response.status === 500) {
                  console.log('There was a problem with server');
                } else {
                  console.log(err.response.data.msg);
                }
              }
            }}
          >
            Upload
          </button>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Link to Website'
            name='linkTo'
            value={linkTo}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Technologies Used'
            name='technologies'
            value={technologies}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='desc'
            value={desc}
            onChange={e => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Project Description'
          ></textarea>
        </div>
        <button
          className='btn btn-primary my-1'
          onClick={e => {
            e.preventDefault();
            addProject(formData, history);
          }}
        >
          Submit
        </button>
        <Link className='btn btn-light my-1' to='/dashboard'>
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
