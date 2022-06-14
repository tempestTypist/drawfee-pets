import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ALLPETS } from '../utils/queries';
import { ADD_PET } from './../utils/mutations';

import ALLPETS from '../assets/images';
import Auth from './../utils/auth';
import Carousel from '../components/Carousel';
import ColourSelect from '../components/ColourSelect';

const CreatePet = () => {
const { loading, data: allpetsData } = useQuery(QUERY_ALLPETS);

const allpets = allpetsData?.allpets || [];
const pets = allpets.map((pet) => (pet.petSpecies))

const [addPet, { error, data }] = useMutation(ADD_PET);

const [petState, setPetState] = useState({
  petSpecies: pets[0],
  petName: '',
  petColour: '',
});

const selectPet = (selected) => {
  setPetState({ ...petState, petSpecies: selected})
}

const handleChange = (event) => {
  const { name, value } = event.target;
  setPetState({ ...petState, [name]: value });
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  console.log(petState);

  try {
    const { data } = await addPet({
      variables: {
        ...petState,
        petOwner: Auth.getProfile().data.username,
      },
    });

    console.log(data.addPet._id)
    window.location.assign('/')
  } catch (err) {
    console.error(err);
  }
};

if (loading) {
  return <div>Loading...</div>;
}

  return (
      <>
      {Auth.loggedIn() ? (
        <>
          {data ? (
              <p>
                Pet created! Return to the{' '}
                <Link to="/">home page.</Link>
              </p>
            ) : (
              <Container
                as={Form}
                className="d-flex flex-column justify-content-center align-items-center"
                onSubmit={handleFormSubmit}
                fluid >

                <Row>
                  <Col md={5}>
                    <div className="pet-preview__wrapper">
                      <div  className="pet-preview">
                        <Image 
                          className="pet-preview__screen" 
                          src={ALLPETS[petState.petSpecies]}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="stacked-screens__wrapper">
                      <div className="stacked-screen">
                        <InputGroup>
                          <InputGroup.Text id="inputGroup-sizing-default">Pet Name</InputGroup.Text>
                          <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            name="petName"
                            value={petState.petName}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </div>
                      <div className="stacked-screen">
                        <ColourSelect handleChange={handleChange} />
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} className="pet-chooser">
                    <Carousel heading="Pet Chooser" carouselItems={pets} selectPet={selectPet} />
                  </Col>

                  <Col xs={12} className="screen-btn">
                    <button type="submit" className="btn py-3">
                      Create!
                    </button> 
                  </Col>
                </Row>

                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
              </Container>
              )}
        </>
      ) : (
        <p>
          You need to be logged in to create a pet. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default CreatePet;
