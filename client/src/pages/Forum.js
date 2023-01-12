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
    <div className="forum-table flex-row justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PostList
          posts={posts}
          title="Community Forum"
        />
      )}
    </div>
  );
};

export default Forum;
