import React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import PetList from '../components/PetList';

import { Card } from 'react-bootstrap';


const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  console.log("Userdata: " + JSON.stringify(user))

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

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
    <section className="section about-section container-fluid" id="about">
      <div className="row align-items-center">
          <div className="col-lg-6 bg-white">
              <div className="about-text go-to">
                  <h3 className="janky-card-header">{userParam ? `${user.username}'s` : 'Your'} profile</h3>
                  <div className="row about-list mb-4">
                      <div className="col-md-6">
                          <div className="media">
                              <label>Joined on</label>
                              <p>4th april 1998</p>
                          </div>
                          <div className="media">
                              <label>Birthday</label>
                              <p>11/11/1111</p>
                          </div>
                          <div className="media">
                              <label>I Go By</label>
                              <p>She/Her</p>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="media">
                              <label>Pets</label>
                              <p>3</p>
                          </div>
                          <div className="media">
                              <label>Favourite Pet</label>
                              <p>favpet</p>
                          </div>
                          <div className="media">
                              <label>Forum Posts</label>
                              <p>23</p>
                          </div>
                      </div>
                  </div>
                  <div className="about-desc">
                    <h4 className="janky-card-header">User Description</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
              </div>
          </div>
          <div className="col-lg-6">
              <div className="about-avatar">
                  <img src="https://via.placeholder.com/350" title="User Profile Picture" alt="User Profile Picture" />
              </div>
          </div>
      </div>
    </section>
  );
};

export default Profile;
