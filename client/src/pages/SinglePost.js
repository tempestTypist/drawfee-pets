import React from 'react'

// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import Loading from '../components/Loading'
import { Card } from 'react-bootstrap'

import { QUERY_SINGLE_POST } from '../utils/queries'

const SinglePost = ({ setErrors }) => {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  return (
    <div className="my-3">
      { loading ? (
        <Loading />
      ) : (
        <>
        <Card className="flex-row">
          <Card.Header>
            <p>Profile picture</p>
            <p>User info box with: Username, number of posts, send message, maybe small pet image</p>
          </Card.Header>
          <Card.Body>
            <p>Post subject</p>
            <span>by </span>
            <span>
              <Link
                to={`/profile/${post.postAuthor}`}
                >
                {post.postAuthor}, 
              </Link>
              {post.createdAt}
            </span>
            
            <br />
            <br />
            {post.postText}
          </Card.Body>
        </Card>

          <div className="my-5">
            <CommentList comments={post.comments} />
          </div>
          <div className="m-3 p-4">
            <CommentForm postId={post._id} setErrors={setErrors} />
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
