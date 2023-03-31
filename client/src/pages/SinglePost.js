import React from 'react'

// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import Loading from '../components/Loading'

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
          <h3 className="card-header p-2 m-0">
            <Link
              className=""
              to={`/profile/${post.postAuthor}`}
              >
              {post.postAuthor}
            </Link>
            <br />
            <span style={{ fontSize: '1rem' }}>
              had this thought on {post.createdAt}
            </span>
          </h3>
          <div className="py-4">
            <blockquote
              className="p-4"
            >
              {post.postText}
            </blockquote>
          </div>

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
