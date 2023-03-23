import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';
import { QUERY_PETS } from '../utils/queries'
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap'
import ImageImport from '../utils/imageimport'
import Loading from '../components/Loading'

const Home = () => {
  const { loading, data } = useQuery(QUERY_PETS);
  const pets = data?.pets || [];

  const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

  const [previewPet, setPreviewedPet] = useState(0);

  useEffect(() => {
    const len = pets.length;
    setPreviewedPet(Math.floor(Math.random() * len));
  }, [pets]);

  return (
    <Container fluid>
      <Row>
        <Col xl={8}>
          <div className="diagonal-hero-bg">
            <div className="p-4 p-md-5 text-white">
              <h1 className="display-4 fw-bold">Welcome Message</h1>
                <span className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</span>
            </div>
          </div>

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
                        <div>
                          This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.
                          <hr></hr>
                          This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.
                        </div>
                        <a href="/">Read More</a>
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
                  <div className="janky-card-inner-body">
                    <Card.Title>January 1, 2021 by Mark</Card.Title>
                    <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                    <blockquote>
                      <p>Longer quote goes here, maybe with some <strong>emphasized text</strong> in the middle of it.</p>
                    </blockquote>
                    <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                  </div>
                </Card.Body>
              </div>
            </Card>

            <Card className="janky-card-wrapper mb-5">
              <Card.Header className="janky-card-header">
                New Items
              </Card.Header>
              <div className="janky-card-body-wrapper">
                <Card.Body className="janky-card-body">
                  <div className="janky-card-inner-body">
                    <Card.Title>January 1, 2021 by Mark</Card.Title>
                    <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                    <ul>
                      <li>First list item</li>
                      <li>Second list item with a longer description</li>
                      <li>Third list item to close it out</li>
                    </ul>
                    <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </div>
        </Col>

        {data ? (
          <Col xl={4}>
            {loading ? (
              <Loading />
            ) : (
              <Card className="janky-card-wrapper key-was-here p-4 pt-0">
                <Card.Header className="janky-card-header pt-0">
                  <div className="pet-name">
                    Featured: {pets[previewPet].petName}!
                  </div>
                </Card.Header>
                <div className="janky-card-body-wrapper">
                  <Card.Body className="janky-card-body">
                    <div className="janky-card-inner-body pet-list__wrapper">
                      <Image src={images[`${pets[previewPet].petSpecies}/${pets[previewPet].petSpecies}--${pets[previewPet].petColour}.png`]} className="pet-list__image featured-pet" alt="Pet image"/>
                    </div>
                  </Card.Body>
                </div>
                <Card.Footer className="janky-card-footer">
                  <div className="janky-card-footer__inner">
                    Made by: 
                    <Link 
                      className="user-profile-link me-2"
                      to={`/profile/${pets[previewPet].petOwner}`}>
                        {pets[previewPet].petOwner} 
                    </Link>
                    {/* {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/profile/${pet.petOwner}`}
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
                  </div>
                </Card.Footer>
              </Card>
            )}
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default Home;
