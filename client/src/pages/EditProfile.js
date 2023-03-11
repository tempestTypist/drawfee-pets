import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../utils/mutations'
import { QUERY_INBOX, QUERY_ME, QUERY_USER } from '../utils/queries'

import Auth from '../utils/auth'

import { Form } from 'react-bootstrap'

const EditProfile = ({ setErrors }) => {
  const [message, setMessage] = useState({
		messageRecipient: '',
    messageTitle: '',
    messageText: ''
  });

	const { messageRecipient, messageTitle, messageText } = message;



  const handleChange = (e) => {
    const { name, value } = e.target;
		setMessage((prev) => ({
			...prev,
			[name]: value,
		}));
  };

  const validateForm = () => {
    const { messageRecipient, messageTitle, messageText } = message;
    const errors = {};
		console.log("Errors cleared, running validation...")
    setErrors();

		if (messageRecipient.trim().length === 0) {
      errors.recipientNull = "Please enter a Recipient!"
    } else if (messageRecipient.trim().length < 2) {
      errors.recipientLen = "Your Recipient is too short!"
    } else if (messageRecipient.length > 100) {
      errors.recipientLen = "Recipient cannot exceed 100 characters!"
    }

    if (messageTitle.trim().length === 0) {
      errors.titleNull = "Please enter a title!"
    } else if (messageTitle.trim().length < 2) {
      errors.titleLen = "Your title is too short!"
    } else if (messageTitle.length > 100) {
      errors.titleLen = "Title cannot exceed 100 characters!"
    }

    if (messageText.trim().length === 0) {
      errors.bodyNull = "Please enter text for your message!"
    } else if (messageText.trim().length < 2) {
      errors.bodyLen = "Your message is too short!"
    } else if (messageText.length > 280) {
      errors.bodyLen = "Please shorten your message, it cannot exceed 280 characters!"
    }

    setErrors(errors)
		console.log("Errors set: " + JSON.stringify(errors))

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
		// 		console.log(data)
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
      <div
        className="col-12 col-md-10">

        <h2 className="mb-4">Edit Profile</h2>

        {Auth.loggedIn() ? (
					<Form 
						className="flex-row justify-center justify-space-between-md align-center"
						onSubmit={handleFormSubmit}
						>
						<Form.Group className="mb-3">
							<Form.Label>Recipient</Form.Label>
							<Form.Control 
								type="text" 
								name="messageRecipient"
								value={message.messageRecipient}
								onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Title</Form.Label>
							<Form.Control 
								type="text" 
								name="messageTitle"
								value={message.messageTitle}
								onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control 
								as="textarea" 
								rows={3}
								name="messageText"
								value={message.messageText}
								style={{ lineHeight: '1.5', resize: 'vertical' }}
								onChange={handleChange} />
						</Form.Group>
						<div className="col-12 col-lg-3">
							<button className="btn btn-primary btn-block py-3" type="submit">
								Send Message
							</button>
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
