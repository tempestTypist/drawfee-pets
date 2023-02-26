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
import ToastComponent from '../components/ToastComponent'

const isPetname = (username) =>
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i.test(username);

const CreatePet = () => {
const { loading, data: allpetsData } = useQuery(QUERY_ALLPETS);
const allpets = allpetsData?.allpets || [];
const pets = allpets.map((pet) => (pet.petSpecies))
const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

const [errors, setErrors] = useState({});
const [petState, setPetState] = useState({
  petSpecies: pets[0],
  petName: '',
  petColour: "Red",
})

const [addPet, { error, data }] = useMutation(ADD_PET);

const selectPet = (selected) => {
  setPetState({ ...petState, petSpecies: selected})
}

const handleChange = (e) => {
  const { name, value } = e.target;

  setPetState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const validateForm = () => {
  const { petName } = petState;
  const errors = {};
  setErrors();

  if (petName.trim().length === 0) {
    errors.petnameNull = "Please choose a name for your pet!"
  } else if (!isPetname(petName)) {
    errors.petnameReq = "Please enter a valid pet name! Pet names can contain characters a-z, 0-9, underscores and periods. The pets name cannot start or end with a period. It must also not have more than one period sequentially. Max length is 30 chars."
  }

  setErrors(errors);

  if (Object.keys(errors).length > 0) {
    return false
  } else {
    return true
  }
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const { data } = await addPet({
        variables: {
          ...petState,
          petOwner: Auth.getProfile().data.username,
        },
      });

      window.location.assign('/')
    } catch (err) {
      const { name, message } = err;

      setErrors({
        [name]: message,
      });
    }
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
                        <div className="stacked-screen d-flex justify-content-center">
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

                <ToastComponent toasts={errors} />
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
