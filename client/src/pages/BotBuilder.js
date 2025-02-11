import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'

import { QUERY_BOTS } from '../utils/queries'
import { ADD_BOT } from '../utils/mutations'

import ImageImport from '../utils/imageimport'
import Auth from '../utils/auth'
import Loading from '../components/Loading'
import Carousel from '../components/Carousel'
import ColourSelect from '../components/ColourSelect'

const isBotname = (username) =>
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i.test(username);

const BotBuilder = ({ setErrors }) => {
const { loading, data: botsData } = useQuery(QUERY_BOTS);
const bots = botsData?.bots || [];
const allbots = bots.map((bot) => (bot.chassis))
const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

const [botPreview, setBotPreview] = useState({
  chassis: allbots[0],
  botName: '',
  botColour: "Red",
})

const [addBot, { error, data }] = useMutation(ADD_BOT);

const selectBot = (selected) => {
  setBotPreview({ ...botPreview, chassis: selected})
}

const handleChange = (e) => {
  const { name, value } = e.target;

  setBotPreview((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const validateForm = () => {
  const { botName } = botPreview;
  const errors = {};
  setErrors();

  if (botName.trim().length === 0) {
    errors.petnameNull = "Please choose a name for your bot!"
  } else if (!isBotname(botName)) {
    errors.petnameReq = "Please enter a valid bot name! Bot names can contain characters a-z, 0-9, underscores and periods. The bots name cannot start or end with a period. It must also not have more than one period sequentially. Max length is 30 chars."
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
      const { data } = await addBot({
        variables: {
          ...botPreview,
          inventor: Auth.getProfile().data.username,
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
                            src={images[`${botPreview.chassis}/${botPreview.chassis}--${botPreview.botColour}.png`]}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col xl={6} className="flex-grow-1" style={{"marginBottom": "-1rem"}}>
                      <div className="stacked-screens__wrapper">
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
                          <ColourSelect handleChange={handleChange} />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} className="pet-chooser">
                      <Carousel heading="Bot Chooser" carouselItems={allbots} selectBot={selectBot} />
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
