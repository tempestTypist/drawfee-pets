import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import { Pagination } from 'react-bootstrap';
import { ButtonGroup, ButtonToolbar  } from 'react-bootstrap';
import JankyButton from '../components/JankyButton';

import { QUERY_POSTS } from '../utils/queries';

const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <>
      <h2 className="mb-4">Community Forum</h2>
      <div className="forum-table flex-row justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PostList
            posts={posts}
            title="Posts"
          />
        )}
      </div>
    </>
  );
};

export default Forum;
