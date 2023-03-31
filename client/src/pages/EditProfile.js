import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../utils/mutations'
import { QUERY_INBOX, QUERY_ME, QUERY_USER } from '../utils/queries'

import Auth from '../utils/auth'

import { Form } from 'react-bootstrap'

const EditProfile = ({ setErrors }) => {
  const [profile, updateProfile] = useState({
    description: ''
  });

	const { description } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
		updateProfile((prev) => ({
			...prev,
			[name]: value,
		}));
  };

  const validateForm = () => {
    const { description } = profile;
    const errors = {};
    setErrors();


    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return false
    } else {
      return true
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // if (validateForm()) {
    //   try {
    //     const { data } = await sendMessage({
    //       variables: {
    //         ...message,
    //         messageAuthor: Auth.getProfile().data.username,
    //       },
    //     });

    //     // window.location.assign('/message-center')
    //   } catch (err) {
    //     const { name, message } = err;
    
    //     setErrors({
    //       [name]: message,
    //     });
    //   }
    // }
  };

  return (
    <div className="flex-row justify-center">
      <div className="col-12 col-md-10">

        <h2 className="mb-4">Edit Profile</h2>

        {Auth.loggedIn() ? (
					<Form 
						className="flex-row justify-center justify-space-between-md align-center"
						onSubmit={handleFormSubmit}
						>
						<Form.Group className="mb-3">
							<Form.Label>Description (optional)</Form.Label>
							<Form.Control 
								as="textarea" 
								rows={3}
								name="description"
								value={profile.description}
								style={{ lineHeight: '1.5', resize: 'vertical' }}
								onChange={handleChange} />
						</Form.Group>
						<div className="col-12 col-lg-3">
              <div className="btn-janky-wrapper">
                <button className="btn-janky btn btn-theme" type="submit">
                  Save
                </button>
              </div>
						</div>
					</Form>
        ) : (
          <p>
            You need to be logged in to make a post. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}

      </div>
    </div>
  );
};

export default EditProfile;
