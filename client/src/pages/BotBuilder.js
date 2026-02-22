import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'

import { QUERY_BASEBOTS } from '../utils/queries'
import { ADD_BOT } from '../utils/mutations'
import { motion, useAnimation } from "framer-motion";

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
  const controls = useAnimation();
  const { setError } = useError();

  const [addBot, { error, data }] = useMutation(ADD_BOT);

  const [botPreview, setBotPreview] = useState({
    model: 'D',
    chassis: 'SQU',
    botName: '',
    colour: 'red',
  })

  const { model, chassis, botName, colour } = botPreview

  const carouselItems = useMemo(() => {
    return allbots.map((bot) => ({
      id: bot,
      image: images[`MODEL-${model}/${bot}/full-body.png`]
    }));
  }, [allbots, model, images]);

  const modelChooserOptions = { 
    image: "big-button",
    values: ["D", "T", "L"] }

  const colourChooserOptions = { 
    image: "paint-splatter",
    values: ["red", "blue", "green", "yellow"] }

  const selectBot = useCallback((selected) => {
    setBotPreview((prev) => ({
      ...prev,
      chassis: selected
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)

    setBotPreview((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validateForm = () => {
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
  }

  useEffect(() => {
    controls.start({
      scaleX: [1, 1.50, 0.60, 1],
      scaleY: [1, 0.60, 1.50, 1],
      y: [0, -12, 0],
      transition: {
        duration: .2,
        ease: "easeOut",
        times: [0, 0.35, 0.7, 1]
      }
    })
    .then(controls.set({
      y: 0,
      scaleX: 1,
      scaleY: 1
    }))
  }, [model, chassis, colour, controls]);

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
                  <Row>
                    <Col xl={5} style={{"marginBottom": "-1rem"}}>
                      <div className="bot-preview__wrapper">
                          {loading ? ( <Loading /> ) : (
                            <motion.div
                              className="bot-preview"
                              animate={controls}>
                              <Image 
                                className="bot-preview__screen" 
                                src={images[`MODEL-${model}/${chassis}/head-${colour}.png`]}
                              />
                              <Image 
                                className="bot-preview__screen" 
                                src={images[`MODEL-${model}/arms.png`]}
                              />
                              <Image 
                                className="bot-preview__screen" 
                                src={images[`MODEL-${model}/body.png`]}
                              />
                              <Image 
                                className="bot-preview__screen" 
                                src={images[`MODEL-${model}/legs.png`]}
                              />
                            </motion.div>
                          )}
                      </div>
                    </Col>

                    <Col xl={6} className="flex-grow-1" style={{"marginBottom": "-1rem"}}>
                      <div className="stacked-screens__wrapper">
                        <div className="stacked-screen d-flex justify-content-center">
                          <InputGroup className="w-75">
                            <InputGroup.Text id="bot-name-input">Name</InputGroup.Text>
                            <FormControl
                              aria-label="Default"
                              aria-describedby="bot-name-input"
                              name="botName"
                              value={botName}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="stacked-screen">
                          <CustomSelect 
                            handleChange={handleChange}
                            chooserType="colour"
                            chooserOptions={colourChooserOptions}
                            selectedValue={colour}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} className="bot-builder">
                      {loading ? ( <Loading /> ) : (
                        <Carousel 
                          heading="Bot Builder" 
                          carouselItems={carouselItems} 
                          selectedItem={selectBot} 
                        /> 
                      )}
                    </Col>

                    <Col xl={12} className="bot-builder__buttons">
                      <div className="screen-btn-wrapper">
                        <button type="submit" className="screen-btn" />
                      </div>

                      <CustomSelect 
                        handleChange={handleChange}
                        chooserType="model"
                        chooserOptions={modelChooserOptions}
                        selectedValue={model}
                      />
                    </Col>
                  </Row>
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
