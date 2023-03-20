import React from 'react'

// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_SINGLE_PET } from '../utils/queries'

import Loading from '../components/Loading'

const SinglePet = () => {
  const { petId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  return (
    <div className="my-3">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 className="card-header p-2 m-0">
            <Link
              to={`/profile/${pet.petOwner}`}
              >
              {pet.petOwner}
            </Link>
            <br />
            <span>
              created this pet on {pet.createdAt}
            </span>
          </h3>
          <div className="py-4">
            <blockquote
              className="p-4"
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
