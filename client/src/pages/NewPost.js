import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_POST } from '../utils/mutations'
import { QUERY_POSTS, QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'

import { Form } from 'react-bootstrap'

const NewPost = ({ setErrors }) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [postState, setPostState] = useState({
    postTitle: '',
    postText: ''
  });

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (err) {
        const { name, message } = err;
  
        setErrors({
          [name]: message,
        });      
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'postTitle' && value.length <= 100) {
      setPostState({ ...postState, [name]: value });
    }

    if (name === 'postText' && value.length <= 280) {
      setPostState({ ...postState, [name]: value });
      setCharacterCount(value.length);
    }
  };

  const validateForm = () => {
    const { postTitle, postText } = postState;
    const errors = {};
    setErrors();

    if (postTitle.trim().length === 0) {
      errors.titleNull = "Please enter a title!"
    } else if (postTitle.trim().length <= 2) {
      errors.titleLen = "Your title is too short!"
    } else if (postTitle.length > 100) {
      errors.titleLen = "Title cannot exceed 100 characters!"
    }

    if (postText.trim().length === 0) {
      errors.bodyNull = "Please enter text for your post!"
    } else if (postText.trim().length <= 2) {
      errors.bodyLen = "Your post is too short!"
    } else if (postText.length > 280) {
      errors.bodyLen = "Please shorten your post, it cannot exceed 280 characters!"
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
        const { data } = await addPost({
          variables: {
            ...postState,
            postAuthor: Auth.getProfile().data.username,
          },
        });
        window.location.assign('/community-forums')
      } catch (err) {
        const { name, message } = err;
    
        setErrors({
          [name]: message,
        });
      }
    }
  };

  return (
    <div className="flex-row justify-center">
      <div
        className="col-12 col-md-10">


        <h2 className="mb-4">New Post</h2>
        {Auth.loggedIn() ? (
          <Form 
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
            >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="postTitle"
                value={postState.postTitle}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="postText"
                value={postState.postText}
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange} />
            </Form.Group>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? 'text-danger' : ''
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <div className="col-12 col-lg-3">
              <div className="btn-janky-wrapper">
                <button className="btn-janky btn btn-theme" type="submit">
                  Add Post
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

export default NewPost;
