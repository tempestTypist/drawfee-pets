import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { REMOVE_PET, FAVOURITE_PET } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import { ButtonGroup, Card, Image, ToggleButton } from 'react-bootstrap';
import ImageImport from '../../utils/imageimport';

library.add(fasStar, farStar)

const PetList = ({
  pets,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  
	const images = ImageImport.importAll(require.context('../../assets/images/pets', false, /\.(png|jpe?g|svg)$/));

  const [favourite, setFavourite] = useState({
    activePet: null,
  });

  const isFavourite = (index) => { 
    if (pets[index] === favourite.activePet) {
      console.log("fav = true")
      return "pet__favourite"
    } else {
      console.log("fav = false")
      return
    }
  };

  const [favouritePet, { err }] = useMutation(FAVOURITE_PET, {
    update(cache, { data: { favouritePet } }) {
      console.log("data: favouritePet", { data: { favouritePet } })
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: favouritePet },
        });
        console.log("me: favouritePet", { me: { favouritePet } })
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFavePet = async (index) => {
    const petId = pets[index]._id;
    console.log("ID passed to handleFavePet", petId);
    setFavourite({...favourite, activePet: pets[index]});
    console.log("setting active pet:", favourite)
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
        console.log({data: { me: removePet }})
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemovePet = async (petId) => {
    try {
      const { data } = await removePet({
        variables: { petId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  }

  return (
    <div className="pet-list d-flex flex-wrap">
      {showTitle && <h3>{title}</h3>}
      {pets &&
        pets.map((pet, index) => (
          <Card className="janky-card-wrapper key-was-here col-12 col-sm-6 col-lg-4 col-xl-3 p-4">
            <Card.Header className="janky-card-header">
              <div className="pet-name">
                {pet.petName}
              </div>
              <div className="pet-toolbar">
                  {showUsername ? (
                    <>
                    </>
                  ) : (
                    <>
                      <div key={pet._id} onClick={() => handleFavePet(pet._id)}>
                      </div>
                      <FontAwesomeIcon className={isFavourite(index)} icon={"fa-solid fa-star"} onClick={() => handleFavePet(index)} />
                      <button
                        className="btn"
                        onClick={() => handleRemovePet(pet._id)}>
                        X
                      </button>
                    </>
                  )}
              </div>
            </Card.Header>
            <div className="janky-card-body-wrapper">
              <Card.Body className="janky-card-body">
                <div className="janky-card-inner-body">
                    <Image src={images[`${pet.petSpecies}.png`]} className="pet-list__image" alt="Pet image"/>
                </div>
              </Card.Body>
            </div>
            <Card.Footer className="janky-card-footer">
              <div className="janky-card-footer__inner">
                {pet.petName} the {pet.petSpecies}
                {showUsername ? (
                  <Link
                    className="text-light"
                    to={`/profiles/${pet.petOwner}`}
                  >
                    {pet.petOwner} <br />
                    <span style={{ fontSize: '1rem' }}>
                      created this pet on {pet.createdAt}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                      You made this pet on {pet.createdAt}
                    </span>
                  </>
                )}
                <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={`/pets/${pet._id}`}
                >
                  View pet profile
                </Link>
              </div>
            </Card.Footer>
          </Card>
        ))}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default PetList;
