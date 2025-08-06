import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_SINGLE_BOT } from '../utils/queries'

import { Container, Row, Col, Button, Card, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import Loading from '../components/Loading'
import ImageImport from '../utils/imageimport';

const SingleBot = () => {
  const { botId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_BOT, {
    variables: { botId: botId },
  });

  const bot = data?.userbot || {};

  const images = ImageImport.importAll(require.context('../assets/images/pets', true, /\.(png|jpe?g|svg)$/));

  return (
    <Container className="my-3">
      {loading ? (
        <Loading />
      ) : (
        <Row className="flex-column flex-xl-row align-items-center">
          <Col xs={10} lg={8} xl={6} style={{"margin-bottom": "-1rem"}}>
            <div className="pet-preview__wrapper">
              <div className="pet-preview">
                <Image 
                  fluid
                  className="pet-preview__screen mb-4" 
                  src={images[`${bot.chassis}/${bot.chassis}--${bot.colour}.png`]}
                />
              </div>
            </div>
          </Col>

          <Col lg={9} xl={6}>
            <div className="stacked-screens__wrapper">
              <div className="stacked-screen d-flex justify-content-center">
                <h2 className="mt-3 ps-5">{bot.botName}</h2>
              </div>
            </div>

            <div className="pet-chooser justify-content-center">
              <Link
                to={`/profile/${bot.inventor}`}
                className="me-1"
                >
                {bot.inventor}
              </Link>
              <span>
                created this bot on {bot.createdAt}
              </span>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SingleBot;
