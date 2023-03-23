import React from 'react'

// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Card } from 'react-bootstrap'
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
        <Card className="janky-card-wrapper mb-2">
          <div className="janky-card-body-wrapper">
            <Card.Body className="janky-card-body">
              <div className="janky-card-inner-body">
            <h3 className="card-header p-2 m-0">
              {`From `}
              <Link
                className=""
                to={`/profile/${message.messageAuthor}`}
                >
                {message.messageAuthor}
              </Link>
              <br />
              <span>
                at {message.createdAt}
              </span>
            </h3>
            <div className="py-4">
              <blockquote
                className="p-4">
                {message.messageText}
              </blockquote>
            </div>
          </div>
          </Card.Body>
        </div>
      </Card>
      )}
    </div>
  );
};

export default SingleMessage;
