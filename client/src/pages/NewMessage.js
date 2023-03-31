import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../utils/mutations'
import { QUERY_INBOX, QUERY_ME, QUERY_USER } from '../utils/queries'

import Auth from '../utils/auth'

import { Form, Card } from 'react-bootstrap'

const NewMessage = ({ setErrors }) => {
  const [message, setMessage] = useState({
		messageRecipient: '',
    messageTitle: '',
    messageText: ''
  });

	const { messageRecipient, messageTitle, messageText } = message;

  // const { loading, data } = useQuery(QUERY_INBOX, { 
  //   variables: { username: messageRecipient } 
  // });
  // const inbox = data?.inbox || [];
  // console.log(inbox)

  const [sendMessage, { error, data }] = useMutation(SEND_MESSAGE, {
    update(cache, { data: { sendMessage } }) {
      try {
				const inbox = cache.readQuery({ 
					query: QUERY_INBOX,
					variables: { 
						username: messageRecipient
					},
				});
				cache.writeQuery({
					query: QUERY_INBOX,
					data: { inbox: [sendMessage, inbox] },
				});
      } catch (err) {
        const { name, message } = err;
  
        setErrors({
          [name]: message,
        });      
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
		setMessage((prev) => ({
			...prev,
			[name]: value,
		}));
    // if (name === 'messageTitle' && value.length <= 100) {
    //   setMessage({ ...message, [name]: value });
    // }

    // if (name === 'messageText' && value.length <= 280) {
    //   setMessage({ ...message, [name]: value });
    // }
  };

  const validateForm = () => {
    const { messageRecipient, messageTitle, messageText } = message;
    const errors = {};
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

    if (Object.keys(errors).length > 0) {
      return false
    } else {
      return true
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await sendMessage({
          variables: {
            ...message,
            messageAuthor: Auth.getProfile().data.username,
          },
        });
        window.location.assign('/message-center/inbox')
      } catch (err) {
        const { name, message } = err;
    
        setErrors({
          [name]: message,
        });
      }
    }
  };

  return (
    <>
      <h2>New Message</h2>
      <Card className="janky-card-wrapper mb-2">
        <div className="janky-card-body-wrapper">
          <Card.Body className="janky-card-body">
            <div className="janky-card-inner-body">
                {Auth.loggedIn() ? (
                  <>
                    {data ? (
                      <p className="text-center">Message sent!</p>
                    ) : (
                      <Form 
                        className="flex-row justify-center align-center mx-4"
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
                          <Form.Label>Body</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="messageText"
                            value={message.messageText}
                            style={{ lineHeight: '1.5', resize: 'vertical' }}
                            onChange={handleChange} />
                        </Form.Group>
                        {/* <p>{error}</p> */}
                        <div className="col-12 col-lg-3">
                          <div className="btn-janky-wrapper">
                            <button className="btn-janky btn btn-theme" type="submit">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}  
                  </>
                ) : (
                  <p>
                    You need to be logged in to make a post. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                  </p>
                )}
            </div>
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default NewMessage;
