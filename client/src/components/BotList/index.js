import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { REMOVE_BOT, FAVOURITE_BOT } from '../../utils/mutations';
import { QUERY_ME, QUERY_SINGLE_PET } from '../../utils/queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import { ButtonGroup, Card, Image, ToggleButton } from 'react-bootstrap';
import JankyButton from '../JankyButton';
import ImageImport from '../../utils/imageimport';

library.add(fasStar, farStar)

const BotList = ({
  user,
  title,
  showTitle = true,
  showUsername = true,
}) => {  
	const images = ImageImport.importAll(require.context('../../assets/images/pets', true, /\.(png|jpe?g|svg)$/));
  const { userBots, activeBot } = user
  console.log(user)

  const [favourite, setFavourite] = useState({
    activeBot: activeBot,
  });

  const [favouriteBot, { err }] = useMutation(FAVOURITE_BOT, {
    update(cache, { data: { favouriteBot } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME })

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, activeBot: favouriteBot } },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleFaveBot = async (index) => {
    const botId = userBots[index]._id;
    setFavourite({ activeBot: userBots[index] });

    try {
      const { data } = await favouriteBot({
        variables: { botId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [removeBot, { error }] = useMutation(REMOVE_BOT, {
    update(cache, { data: { removeBot } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeBot },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleRemoveBot = async (botId) => {
    let result = window.confirm("Are you sure you'd like to send this pet to the pound? I haven't made one yet so you can't get them back! Unless you make another one, of course.");
    if (result) {
      try {
        const { data } = await removeBot({
          variables: { botId },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (activeBot) {
      setFavourite(activeBot)
    }
  }, [handleFaveBot]);

  if (!userBots) {
    return <h3>No Bots Invented Yet!</h3>;
  }

  return (
    <div className="pet-list d-flex flex-wrap">
      {showTitle && <h3>{title}</h3>}
      {userBots &&
        userBots.map((bot, index) => (
          <Card key={bot._id} className="janky-card-wrapper col-12 col-md-6 col-xl-4 p-4 pt-0">
            <Card.Header className="janky-card-header">
              <div className="pet-name">
                {bot.botName}
              </div>
                {showUsername ? (
                  <>
                  </>
                ) : (
                  <div className="pet-toolbar">
                    <FontAwesomeIcon 
                      className={(favourite._id === bot._id) ? "pet__favourite" : ""} 
                      icon={"fa-solid fa-star"} 
                      onClick={() => handleFaveBot(index)} 
                    />
                    <button
                      className="btn"
                      onClick={() => handleRemoveBot(bot._id)}>
                      X
                    </button>
                  </div>
                )}
            </Card.Header>
            <div className="janky-card-body-wrapper">
              <Card.Body className="janky-card-body">
                <div className="janky-card-inner-body">
                    <Image src={images[`${bot.chassis}/${bot.chassis}--${bot.botColour}.png`]} className="pet-list__image" alt="Bot image"/>
                </div>
              </Card.Body>
            </div>
            <Card.Footer className="janky-card-footer">
              <div className="janky-card-footer__inner text-center">
                {bot.botName} the {bot.chassis}
                {showUsername ? (
                  <span style={{ fontSize: '1rem' }}>
                    <Link 
                      className="user-profile-link me-2"
                      to={`/profile/${bot.inventor}`}>
                        {bot.inventor} 
                    </Link>
                      created this bot on {bot.createdAt}
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                      You made this bot on {bot.createdAt}
                    </span>
                  </>
                )}
                <div className="btn-janky-wrapper">
                  <Link className="btn-janky btn btn-theme" to={`/pets/${bot._id}`}>View bot profile</Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        ))}
    </div>
  );
};

export default BotList;
