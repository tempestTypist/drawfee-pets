import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import PetList from '../components/PetList';

const ProfilePets = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  console.log("Userdata: " + JSON.stringify(user))

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <h2 className="col-12 bg-dark text-light p-3 mb-5">
        {userParam ? `${user.username}'s` : 'Your'} pets
      </h2>

      <div className="col-12 mb-5">
        <div className="framed-card-group">
          <PetList
            user={user}
            title={`${user.username}'s pets`}
            showTitle={false}
            showUsername={userParam ? true : false}
          />
          </div>
      </div>
    </>
  );
};

export default ProfilePets;
