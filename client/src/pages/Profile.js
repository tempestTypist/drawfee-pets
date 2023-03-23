import React from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'
import PetList from '../components/PetList'
import Loading from '../components/Loading'

import { Card } from 'react-bootstrap'

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this!
      </h4>
    );
  }

  return (
    <section className="section profile-section row" id="about">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="col-lg-6">
            <div className="framed-card-group">
              <Card className="janky-card-wrapper mb-2">
                <Card.Header className="janky-card-header profile-header pt-0">
                  {userParam ? `${user.username}'s` : 'Your'} profile
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <div className="janky-card-inner-body">
                      <div className="row about-list mt-0 m-3">
                          <div className="col-6">
                              <div className="media">
                                  <label>Joined on</label>
                                  <p>4th april 1998</p>
                              </div>
                              <div className="media">
                                  <label>I Go By</label>
                                  <p>She/Her</p>
                              </div>
                              <div className="media">
                                  <label>Pets</label>
                                  <p>{`${user.pets.length}`}</p>
                              </div>
                          </div>
                          <div className="col-6">
                              <div className="media">
                                  <label>Birthday</label>
                                  <p>11/11/1111</p>
                              </div>
                              <div className="media">
                                  <label>Forum Posts</label>
                                  <p>{`${user.posts.length}`}</p>
                              </div>
                              <div className="media">
                                  <label>Favourite Pet</label>
                                  {!user.activePet ? (
                                    <p>No favourite!</p>
                                  ) : (
                                    <p>{`${user.activePet.petName}`}</p>
                                  )

                                  }
                              </div>
                          </div>
                          {userParam ? 
                            <></>
                          : 
                            <div className="col-12">
                              <Link 
                                className="me-2"
                                to={`/profile/edit-profile`}>
                                  Edit Profile
                              </Link>
                            </div>
                          }
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </Card>

              <Card className="janky-card-wrapper mb-2">
                <Card.Header className="janky-card-header">
                  Description              
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <div className="janky-card-inner-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </div>
          </div>
          <div className="profile-avatar col-lg-6">
              <img src="https://via.placeholder.com/350" title="User Profile" alt="User Profile" />
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
