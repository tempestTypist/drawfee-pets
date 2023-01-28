import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'

import { QUERY_ALLPETS } from '../utils/queries'
import { ADD_PET } from './../utils/mutations'

import ImageImport from './../utils/imageimport'
import Auth from './../utils/auth'
import Loading from '../components/Loading'
import Carousel from '../components/Carousel'
import ColourSelect from '../components/ColourSelect'

const CreatePet = () => {
// this fetches the names of all pets in the database
const { loading, data: allpetsData } = useQuery(QUERY_ALLPETS);
const allpets = allpetsData?.allpets || [];
//this maps the array of pets into several individual pets
const pets = allpets.map((pet) => (pet.petSpecies))
const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

//addPet mutation
const [addPet, { error, data }] = useMutation(ADD_PET);

//pet state
const [petState, setPetState] = useState({
  petSpecies: pets[0],
  petName: '',
  petColour: "Red",
});

const selectPet = (selected) => {
  setPetState({ ...petState, petSpecies: selected})
}

// handles input changes, passing the users choice to the pet state
const handleChange = (event) => {
  const { name, value } = event.target;
  setPetState({ ...petState, [name]: value });
};

//on form submit, plugs the variables into the add pet mutation, adds pet to users pets array, and sends user to homepage
const handleFormSubmit = async (event) => {
  event.preventDefault();

  try {
    const { data } = await addPet({
      variables: {
        ...petState,
        petOwner: Auth.getProfile().data.username,
      },
    });

    window.location.assign('/')
  } catch (err) {
    console.error(err);
  }
};

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
                className="d-flex flex-column justify-content-center"
                onSubmit={handleFormSubmit}
                fluid >

                {loading ? (
                  <Loading />
                ) : (
                <>
                  <Row>
                    <Col lg={5} style={{"margin-bottom": "-1rem"}}>
                      <div className="pet-preview__wrapper">
                        <div className="pet-preview">
                          <Image 
                            fluid
                            className="pet-preview__screen" 
                            src={images[`${petState.petSpecies}/${petState.petSpecies}--${petState.petColour}.png`]}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col lg={6} className="flex-grow-1" style={{"margin-bottom": "-1rem"}}>
                      <div className="stacked-screens__wrapper">
                        <div className="stacked-screen">
                          <InputGroup className="w-75">
                            <InputGroup.Text id="pet-name-input">Name</InputGroup.Text>
                            <FormControl
                              aria-label="Default"
                              aria-describedby="pet-name-input"
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
                  </Row>

                  <Row>
                    <Col xs={12} className="pet-chooser">
                      <Carousel heading="Pet Chooser" carouselItems={pets} selectPet={selectPet} />
                    </Col>

                    <div className="screen-btn-wrapper">
                      <button type="submit" className="screen-btn" />
                    </div>
                  </Row>
                </>
                )}

                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
              </Container>
            )
          }
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
