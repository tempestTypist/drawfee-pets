import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'
import BotList from '../components/BotList'
import Loading from '../components/Loading'

const ProfileBots = () => {
  const { username: userParam } = useParams();
  console.log(userParam)

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(error)

  const user = data?.me || data?.user || {};

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="col-12 mb-5">
      <div className="framed-card-group">
        {loading ? (
            <Loading />
          ) : (
            <BotList
              user={user}
              title={`${user.username}'s bots`}
              showTitle={false}
              showUsername={userParam ? true : false}
            />
          )}
        </div>
    </div>
      // {/* <h2 className="col-12 bg-dark text-light p-3 mb-5">
      //   {userParam ? `${user.username}'s` : 'Your'} pets
      // </h2> */}
  );
};

export default ProfileBots;
