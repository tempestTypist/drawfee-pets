import React from 'react'

// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Loading from '../components/Loading'

import { QUERY_SINGLE_MESSAGE } from '../utils/queries'

const SingleMessage = ({ setErrors }) => {
  const { messageId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MESSAGE, {
    variables: { messageId: messageId },
  });

  const message = data?.message || {};

  return (
    <div className="my-3">
      { loading ? (
        <Loading />
      ) : (
        <>
          <h3 className="card-header bg-dark text-light p-2 m-0">
            <Link
              className=""
              to={`/profile/${message.messageAuthor}`}
              >
              {message.messageAuthor}
            </Link>
            <br />
            <span style={{ fontSize: '1rem' }}>
              had this thought on {message.createdAt}
            </span>
          </h3>
          <div className="bg-light py-4">
            <blockquote
              className="p-4"
              style={{
                fontSize: '1.5rem',
                fontStyle: 'italic',
                border: '2px dotted #1a1a1a',
                lineHeight: '1.5',
              }}
            >
              {message.messageText}
            </blockquote>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMessage;
