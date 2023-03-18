import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { REMOVE_PET, FAVOURITE_PET } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import { ButtonGroup, Card, Image, ToggleButton } from 'react-bootstrap';
import JankyButton from '../../components/JankyButton';
import ImageImport from '../../utils/imageimport';

library.add(fasStar, farStar)

const PetList = ({
  user,
  title,
  showTitle = true,
  showUsername = true,
}) => {  
	const images = ImageImport.importAll(require.context('../../assets/images/pets', true, /\.(png|jpe?g|svg)$/));
  const { pets, activePet } = user

  //this sets the state of favourite to the activepet
  const [favourite, setFavourite] = useState({
    activePet: activePet,
  });

  const [favouritePet, { err }] = useMutation(FAVOURITE_PET, {
    update(cache, { data: { favouritePet } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME })

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, activePet: favouritePet } },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  //onclick function
  const handleFavePet = async (index) => {
    //captures id of the pet the star was clicked on
    const petId = pets[index]._id;

    //set favourite to the pet with the matching index 
    setFavourite({ activePet: pets[index] });

    try {
      const { data } = await favouritePet({
        variables: { petId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [removePet, { error }] = useMutation(REMOVE_PET, {
    update(cache, { data: { removePet } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removePet },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleRemovePet = async (petId) => {
    let result = window.confirm("Are you sure you'd like to send this pet to the pound? I haven't made one yet so you can't get them back! Unless you make another one, of course.");
    if (result) {
      try {
        const { data } = await removePet({
          variables: { petId },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (activePet) {
      setFavourite(activePet)
    }
  }, [handleFavePet]);

  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  }

  return (
    <div className="pet-list d-flex flex-wrap">
      {showTitle && <h3>{title}</h3>}
      {pets &&
        pets.map((pet, index) => (
          <Card key={pet._id} className="janky-card-wrapper col-12 col-md-6 col-xl-4 p-4 pt-0">
            <Card.Header className="janky-card-header">
              <div className="pet-name">
                {pet.petName}
              </div>
                {showUsername ? (
                  <>
                  </>
                ) : (
                  <div className="pet-toolbar">
                    <FontAwesomeIcon 
                      className={(favourite._id === pet._id) ? "pet__favourite" : ""} 
                      icon={"fa-solid fa-star"} 
                      onClick={() => handleFavePet(index)} 
                    />
                    <button
                      className="btn"
                      onClick={() => handleRemovePet(pet._id)}>
                      X
                    </button>
                  </div>
                )}
            </Card.Header>
            <div className="janky-card-body-wrapper">
              <Card.Body className="janky-card-body">
                <div className="janky-card-inner-body">
                    <Image src={images[`${pet.petSpecies}/${pet.petSpecies}--${pet.petColour}.png`]} className="pet-list__image" alt="Pet image"/>
                </div>
              </Card.Body>
            </div>
            <Card.Footer className="janky-card-footer">
              <div className="janky-card-footer__inner text-center">
                {pet.petName} the {pet.petSpecies}
                {showUsername ? (
                  <span style={{ fontSize: '1rem' }}>
                    <Link 
                      className="user-profile-link me-2"
                      to={`/profile/${pet.petOwner}`}>
                        {pet.petOwner} 
                    </Link>
                      created this pet on {pet.createdAt}
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                      You made this pet on {pet.createdAt}
                    </span>
                  </>
                )}
                <div className="btn-janky-wrapper">
                  <Link className="btn-janky btn btn-theme" to={`/pets/${pet._id}`}>View pet profile</Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        ))}
    </div>
  );
};

export default PetList;
