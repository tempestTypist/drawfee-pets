import React from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'
import BotList from '../components/BotList'
import Loading from '../components/Loading'

import { Card } from 'react-bootstrap'

const Profile = () => {
  const { username: userParam } = useParams();

  const { error, loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (!user.username) {
    return (
      <h4>
        No user by that name!
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
                                  <label>Bots</label>
                                  {!user.userBots ? (
                                    <p>No bots!</p>
                                  ) : (
                                    <p>{`${user.userBots.length}`}</p>
                                  )}
                              </div>
                          </div>
                          <div className="col-6">
                              <div className="media">
                                  <label>Birthday</label>
                                  <p>{user.birthday}</p>
                              </div>
                              <div className="media">
                                  <label>Forum Posts</label>
                                  {!user.posts ? (
                                    <p>No posts!</p>
                                  ) : (
                                    <p>{`${user.posts.length}`}</p>
                                  )}
                              </div>
                              <div className="media">
                                  <label>Favourite Bot</label>
                                  {!user.activeBot ? (
                                    <p>No favourite!</p>
                                  ) : (
                                    <p>{`${user.activeBot.botName}`}</p>
                                  )}
                              </div>
                          </div>
                          {userParam ? 
                            <div className="col-12">
                            <Link 
                              className="me-2"
                              to={`/new-message`}>
                                Send message
                            </Link>
                          </div>
                          : 
                            <div className="col-12">
                              <Link 
                                className="me-2 text-decoration-underline"
                                to={`/edit-profile`}>
                                  Edit Profile
                              </Link>
                            </div>
                          }
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </Card>
              
              {!user.desc ? <></> :
              <Card className="janky-card-wrapper mb-2">
                <Card.Header className="janky-card-header">
                  Description              
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <div className="janky-card-inner-body">
                      <p>{user.desc}</p>
                    </div>
                  </Card.Body>
                </div>
              </Card>}

            </div>
          </div>
          <div className="profile-avatar col-lg-6">
              <img src="https://placehold.co/350" title="User Profile" alt="User Profile" />
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
