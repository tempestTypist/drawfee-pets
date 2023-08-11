import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import JankyButton from '../JankyButton';
import Auth from '../../utils/auth';

const ReplyForm = ({ postId, setErrors }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  const validateForm = () => {
    const errors = {};
    setErrors();

    if (commentText.trim().length === 0 || commentText.trim().length <= 2 ) {
      errors.commentLen = "Your reply is too short!"
    } else if (commentText.length > 280) {
      errors.commentLen = "Your reply cannot exceed 280 characters!"
    }

    setErrors(errors);

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
        const { data } = await addComment({
          variables: {
            postId,
            commentText,
            commentAuthor: Auth.getProfile().data.username,
          },
        });

        setCommentText('');
      } catch (err) {
        const { name, message } = err;
      
        setErrors({
          [name]: message,
        });
      }
   }
  };

  return (
    <div>
      <h4>Post a Reply!</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment"
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}>
                </textarea>
            </div>

            <div className="col-12 col-lg-3">
              <JankyButton type="submit" variant="theme" label="Post Comment" />
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReplyForm;
