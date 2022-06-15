import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import PetList from '../components/PetList';
import PetForm from '../components/PetForm';
import UserList from '../components/UserList';

import { Button, Card, Image } from 'react-bootstrap';

import { QUERY_PETS } from '../utils/queries';
import { QUERY_USERS } from '../utils/queries';


const Home = () => {
  // const { loading, data } = useQuery(QUERY_PETS);
  // const pets = data?.pets || [];

  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
<>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">

            <div className="diagonal-hero-bg">
              <div className="p-4 p-md-5 text-white rounded">
                <h1 className="display-4 fst-italic">Announcement Banner</h1>
                <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                <p className="lead mb-0"><a className="text-white fw-bold">Continue reading...</a></p>
              </div>
            </div>

            {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <UserList
              users={users}
              title="All users."
            />
          )} */}


            {/* <PetList pets={pets} /> */}

            <div className="framed-card-group">
              <Card className="janky-card-wrapper mb-5">
                <Card.Header className="janky-card-header">
                  News
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <div className="janky-card-inner-body">
                        <div className="text">
                          <Card.Title>January 1, 2021 by Mark</Card.Title>
                          <Card.Text>
                            This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.
                            <hr></hr>
                            This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.
                          </Card.Text>
                          <a>Read More</a>
                        </div>
                    </div>
                  </Card.Body>
                </div>
              </Card>

              <Card className="janky-card-wrapper mb-5">
                <Card.Header className="janky-card-header">
                  Events
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <Card.Text className="janky-card-inner-body">
                      <Card.Title>January 1, 2021 by Mark</Card.Title>
                      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                      <blockquote>
                        <p>Longer quote goes here, maybe with some <strong>emphasized text</strong> in the middle of it.</p>
                      </blockquote>
                      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>

              <Card className="janky-card-wrapper mb-5">
                <Card.Header className="janky-card-header">
                  New Items
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <Card.Text className="janky-card-inner-body">
                      <Card.Title>January 1, 2021 by Mark</Card.Title>
                      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                      <ul>
                        <li>First list item</li>
                        <li>Second list item with a longer description</li>
                        <li>Third list item to close it out</li>
                      </ul>
                      <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </div>

            {/* <nav className="blog-pagination" aria-label="Pagination">
              <a className="btn btn-outline-primary">Older</a>
              <a className="btn btn-outline-secondary disabled" tabIndex="-1" aria-disabled="true">Newer</a>
            </nav> */}

          </div>

          <div className="col-md-4">

          <Card className="janky-card-wrapper key-was-here p-4">
            <Card.Header className="janky-card-header">
              <div className="pet-name">
                Pet Name
              </div>
            </Card.Header>
            <div className="janky-card-body-wrapper">
              <Card.Body className="janky-card-body">
                <div className="janky-card-inner-body">
                    <Image src="https://via.placeholder.com/200x160.png" className="pet-list__image" alt="Pet image"/>
                </div>
              </Card.Body>
            </div>
            <Card.Footer className="janky-card-footer">
              <div className="janky-card-footer__inner">
                Made by: User
                {/* {showUsername ? (
                  <Link
                    className="text-light"
                    to={`/profiles/${pet.petOwner}`}
                  >
                    {pet.petOwner} <br />
                    <span style={{ fontSize: '1rem' }}>
                      created this pet on {pet.createdAt}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                      You made this pet on xTimestampx
                    </span>
                  </>
                )} */}
                {/* <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={`/pets/${pet._id}`}
                >
                  View pet profile
                </Link> */}
              </div>
            </Card.Footer>
          </Card>

              <Card className="janky-card-wrapper">
                <Card.Header className="janky-card-header">
                  Status/Development
                </Card.Header>
                <Card.Body className="janky-card-body developement-card">
                  <Card.Text className="janky-card-inner-body">
                    <Card.Title>January 1, 2021 by Mark</Card.Title>
                    <ol className="list-unstyled mb-0">
                      <li><a>March 2021</a></li>
                      <li><a>February 2021</a></li>
                      <li><a>January 2021</a></li>
                      <li><a>December 2020</a></li>
                      <li><a>November 2020</a></li>
                      <li><a>October 2020</a></li>
                      <li><a>September 2020</a></li>
                      <li><a>August 2020</a></li>
                      <li><a>July 2020</a></li>
                      <li><a>June 2020</a></li>
                      <li><a>May 2020</a></li>
                      <li><a>April 2020</a></li>
                    </ol>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
          </div>
        </div>
      </div>

</>
    
      // <div className="flex-row justify-center">
      //   <div
      //     className="col-12 col-md-10 mb-3 p-3"
      //     style={{ border: '1px dotted #1a1a1a' }}
      //   >
      //     <PetForm />
      //   </div>
      //   <div className="col-12 col-md-8 mb-3">
      //     {loading ? (
      //       <div>Loading...</div>
      //     ) : (
      //       <PetList
      //         pets={pets}
      //         title="All Dumb Pets"
      //       />
      //     )}
      //   </div>
      // </div>
  );
};

export default Home;
