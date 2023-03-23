import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_SINGLE_PET } from '../utils/queries'

import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import Loading from '../components/Loading'
import ImageImport from '../utils/imageimport';

const SinglePet = () => {
  const { petId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

  return (
    <Container className="my-3">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col xl={5} style={{"margin-bottom": "-1rem"}}>
              <div className="pet-preview__wrapper">
                <div className="pet-preview">
                  <Image 
                    fluid
                    className="pet-preview__screen" 
                    src={images[`${pet.petSpecies}/${pet.petSpecies}--${pet.petColour}.png`]}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <div className="stacked-screens__wrapper">
                <div className="stacked-screen d-flex justify-content-center">
                  <h2>{pet.petName}</h2>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={6} className="pet-chooser">
              <Link
                to={`/profile/${pet.petOwner}`}
                >
                {pet.petOwner}
              </Link>
              <br />
              <span>
                created this pet on {pet.createdAt}
              </span>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SinglePet;
