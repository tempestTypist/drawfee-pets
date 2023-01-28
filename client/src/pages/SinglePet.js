import React from 'react'

// Import the `useParams()` hook
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_SINGLE_PET } from '../utils/queries'

import Loading from '../components/Loading'

const SinglePet = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    // pass URL parameter
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  return (
    <div className="my-3">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 className="card-header bg-dark text-light p-2 m-0">
            {pet.petOwner} <br />
            <span style={{ fontSize: '1rem' }}>
              created this pet on {pet.createdAt}
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
              {pet.petName}
            </blockquote>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePet;
