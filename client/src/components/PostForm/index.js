import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Form } from 'react-bootstrap';

const PostForm = () => {
  const [postState, setPostState] = useState({
    postTitle: '',
    postText: ''
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          ...postState,
          postAuthor: Auth.getProfile().data.username,
        },
      });
      window.location.assign('/community-forums')
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'postTitle' && value.length <= 100) {
      console.log("Name If statement accessed: " + [name] + " " + value)
      setPostState({ ...postState, [name]: value });
    }

    if (name === 'postText' && value.length <= 280) {
      console.log("Text If statement accessed: " + [name] + " " + value)
      setPostState({ ...postState, [name]: value });
      setCharacterCount(value.length);
    }
  };

  return (
    <>
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
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Post
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </Form>
      ) : (
        <p>
          You need to be logged in to make a post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default PostForm;
