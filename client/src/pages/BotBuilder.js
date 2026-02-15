import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'

import { QUERY_BASEBOTS } from '../utils/queries'
import { ADD_BOT } from '../utils/mutations'

import ImageImport from '../utils/imageimport'
import Auth from '../utils/auth'
import Loading from '../components/Loading'
import Carousel from '../components/Carousel'
import CustomSelect from '../components/CustomSelect'
import { useError } from '../contexts/ErrorContext'

const isBotname = (username) =>
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i.test(username);

const BotBuilder = () => {
const { loading, data: botsData } = useQuery(QUERY_BASEBOTS);
const bots = botsData?.basebots || [];
const allbots = bots.map((bot) => (bot.chassis))
const images = ImageImport.importAll(require.context('../assets/images/bots', true, /\.(png|jpe?g|svg)$/));

const [botPreview, setBotPreview] = useState({
  model: 'D',
  chassis: allbots[0],
  botName: '',
  colour: "Red",
})

const { setError } = useError();

const [addBot, { error, data }] = useMutation(ADD_BOT);

const modelChooserOptions = { 
  image: "big-button",
  values: ["D", "T", "L"] }

const colourChooserOptions = { 
  image: "paint-splatter",
  values: ["red", "blue", "green", "yellow"] }

const selectBot = (selected) => {
  setBotPreview({ ...botPreview, chassis: selected})
}

const handleChange = (e) => {
  const { name, value } = e.target;
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  setBotPreview((prev) => ({
    ...prev,
    [name]: capitalizedValue,
  }));

  console.log(botPreview)
};

const validateForm = () => {
  const { botName } = botPreview;
  setError(null);

  if (botName.trim().length === 0) {
    setError({ message: 'Please choose a name for your bot!' });
    return false;
  }  
  
  if (!isBotname(botName)) {
    setError({ message: 'Please enter a valid bot name! Bot names can contain characters a-z, 0-9, underscores and periods. The bots name cannot start or end with a period. It must also not have more than one period sequentially. Max length is 30 chars.' });
    return false;
  }

  return true;
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const { data } = await addBot({
        variables: {
          ...botPreview,
          inventor: Auth.getProfile().data.username,
        },
      });

      window.location.assign('/')
    } catch (err) {
      setError({ message: err.message });
    }
  }
};

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          {data ? (
              <p>
                Bot created! Return to the{' '}
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
                    <Col xl={5} style={{"marginBottom": "-1rem"}}>
                      <div className="pet-preview__wrapper">
                        <div className="pet-preview">
                          <Image 
                            fluid
                            className="pet-preview__screen" 
                            src={images[`MODEL-${botPreview.model}/${botPreview.chassis}/head-${botPreview.colour}.png`]}
                          />
                          <Image 
                            fluid
                            className="pet-preview__screen" 
                            src={images[`MODEL-${botPreview.model}/arms.png`]}
                          />
                          <Image 
                            fluid
                            className="pet-preview__screen" 
                            src={images[`MODEL-${botPreview.model}/body.png`]}
                          />
                          <Image 
                            fluid
                            className="pet-preview__screen" 
                            src={images[`MODEL-${botPreview.model}/legs.png`]}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col xl={6} className="flex-grow-1" style={{"marginBottom": "-1rem"}}>
                      <div className="stacked-screens__wrapper">
                          <CustomSelect 
                            handleChange={handleChange}
                            chooserType="model"
                            chooserOptions={modelChooserOptions}
                          />
{/* 
                          <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                              inline
                              label="D"
                              value="D"
                              name="model"
                              type="radio"
                              id={`inline-radio-1`}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              label="T"
                              value="T"
                              name="model"
                              type="radio"
                              id={`inline-radio-2`}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              label="L"
                              value="L"
                              name="model"
                              type="radio"
                              id={`inline-radio-3`}
                              onChange={handleChange}
                            />
                          </div> */}

                        <div className="stacked-screen d-flex justify-content-center">
                          <InputGroup className="w-75">
                            <InputGroup.Text id="pet-name-input">Name</InputGroup.Text>
                            <FormControl
                              aria-label="Default"
                              aria-describedby="pet-name-input"
                              name="botName"
                              value={botPreview.botName}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="stacked-screen">
                          <CustomSelect 
                            handleChange={handleChange}
                            chooserType="colour"
                            chooserOptions={colourChooserOptions}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} className="pet-chooser">
                      <Carousel 
                        heading="Bot Chooser" 
                        carouselItems={allbots} 
                        selectBot={selectBot} 
                        model={botPreview.model} />
                    </Col>

                    <div className="screen-btn-wrapper">
                      <button type="submit" className="screen-btn" />
                    </div>
                  </Row>
                </>
                )}
              </Container>
            )
          }
        </>
      ) : (
        <p>
          You need to be logged in to build a bot. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default BotBuilder;
