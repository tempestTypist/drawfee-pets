import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_PET, FAVOURITE_PET } from '../../utils/mutations';
import { QUERY_PETS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import PetSelect from '../PetSelect';
import PetChooser from '../PetChooser'

import ALLPETS from '../../assets/images/index.js'

const PetForm = () => {

  const [petState, setPetState] = useState({
    petSpecies: '',
    petName: '',
    petColour: '',
  });
 
  const [addPet, { error, data }] = useMutation(ADD_PET);

  const handleChange = (event) => {
    const { name, value, alt } = event.target;

    if (event.target.tagName === "IMG") {
      setPetState({ ...petState, [name]: alt });
    } else {
    setPetState({ ...petState, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: {
          ...petState,
          petOwner: Auth.getProfile().data.username,
        },
      });
      console.log(data)
      console.log(data.addPet._id)
      //pass ID to setActivePet?
      //run setActivePet()
      // window.location.assign('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {data ? (
              <p>
                Pet created! Return to the{' '}
                <Link to="/">home page.</Link>
              </p>
            ) : (
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit} >

		{/* <div className="col-md-9">
			<div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="0">


				<ol className="carousel-indicators">
					<li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
					<li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
					<li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
				</ol>   


				<div className="carousel-inner">
					<div className="carousel-item active">
						<div className="row">
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Abgnomel } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Ainteasy } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Berd } className="img-fluid" alt="" /></div></div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="row">
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Bingy } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.BingyJr } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.BoycatFerret } className="img-fluid" alt="" /></div></div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="row">
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Bugfren } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.Cantelope } className="img-fluid" alt="" /></div></div>
							<div className="col-sm-4"><div className="img-box"><img src={ ALLPETS.ChuckyBeef } className="img-fluid" alt="" /></div></div>
						</div>
					</div>
				</div>

				<a className="carousel-control-prev" href="#myCarousel" data-bs-slide="prev">
					<i className="fa fa-chevron-left"></i>
				</a>
				<a className="carousel-control-next" href="#myCarousel" data-bs-slide="next">
					<i className="fa fa-chevron-right"></i>
				</a>
			</div>
		</div> */}










              {/* <div className="col-6">
                <div className="card container-fluid">
                  <ul id="pet-select-list" className="row align-items-center">
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Abgnomel } alt="Abgnomel" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Ainteasy } alt="Ainteasy" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Berd } alt="Berd" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Bingy } alt="Bingy" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.BingyJr } alt="BingyJr" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.BoycatFerret } alt="BoycatFerret" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Bugfren } alt="Bugfren" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Cantelope } alt="Cantelope" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.ChuckyBeef } alt="ChuckyBeef" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Cobranero } alt="Cobranero" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Creamboymon } alt="Creamboymon" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Dragorb } alt="Dragorb" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Egglephant } alt="Egglephant" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.FecisFindo } alt="FecisFindo" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Focacciaman } alt="Focacciaman" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Froggernaut } alt="Froggernaut" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Gainsheen } alt="Gainsheen" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Gamerbear } alt="Gamerbear" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Gatorgolf } alt="Gatorgolf" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.God } alt="God" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Gooliahorse } alt="Gooliahorse" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Hamline } alt="Hamline" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Hockeyfan } alt="Hockeyfan" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Horbe } alt="Horbe" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.ListeningApe } alt="ListeningApe" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.McBomination } alt="McBomination" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.MewFO } alt="MewFO" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Mobpsycho } alt="Mobpsycho" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Punkitty } alt="Punkitty" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Schmallet } alt="Schmallet" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Shydogge } alt="Shydogge" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Snaithan } alt="Snaithan" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Snoozle } alt="Snoozle" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Squishisaurus } alt="Squishisaurus" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Sycophrog } alt="Sycophrog" name="petSpecies" onClick={handleChange} />
                    </li>
                    <li className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
                      <img className="w-100" src={ ALLPETS.Wattafren } alt="Wattafren" name="petSpecies" onClick={handleChange} />
                    </li>
                  </ul>
                </div>
              </div> */}

              <div className="col-6">

                <input
									className="form-input"
									placeholder="Pets name"
									name="petName"
									type="text"
									value={petState.petName}
									onChange={handleChange}
								/>

                <div className="radio-group">
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Red"
                        name="petColour"
                        checked={petState.petColour === "Red"}
                        onChange={handleChange}
                      />
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D02337" d="M17.9,-25C32.2,-22.8,58.9,-36.1,72.3,-34.5C85.7,-33,85.7,-16.5,77.3,-4.8C68.9,6.8,52.1,13.6,43.5,23.5C35,33.4,34.7,46.5,28.8,50.6C22.9,54.7,11.5,49.8,-0.1,50C-11.7,50.2,-23.4,55.5,-26.5,49.8C-29.5,44.1,-24,27.4,-25.4,17.2C-26.9,7.1,-35.2,3.6,-44,-5.1C-52.7,-13.7,-61.9,-27.3,-57.4,-32.2C-53,-37.1,-35,-33.2,-23.1,-36.8C-11.3,-40.4,-5.6,-51.4,-1.9,-48.1C1.8,-44.8,3.6,-27.1,17.9,-25Z" transform="translate(100 100)" />
                      </svg>
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D02337" d="M27.9,-42.6C38,-42.5,49.1,-38.7,47.2,-31C45.3,-23.2,30.2,-11.6,29.7,-0.3C29.2,11,43.3,22.1,40.8,22.1C38.3,22.2,19.3,11.3,9.7,7.4C0.1,3.5,0.1,6.6,-7.6,19.8C-15.3,33,-30.6,56.3,-33.7,56.4C-36.9,56.6,-27.8,33.7,-35.5,20.5C-43.3,7.2,-67.8,3.6,-69.3,-0.9C-70.9,-5.4,-49.5,-10.8,-40,-21C-30.5,-31.3,-33,-46.4,-28.3,-49.5C-23.7,-52.7,-11.8,-43.9,-1.5,-41.4C8.9,-38.9,17.9,-42.6,27.9,-42.6Z" transform="translate(100 100)" />
                      </svg>
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D02337" d="M29.7,-50.7C33.1,-49.4,26.8,-30.6,32.4,-19.3C37.9,-7.9,55.3,-4,61,3.3C66.7,10.5,60.6,21,48.8,21.4C36.9,21.9,19.2,12.2,10.1,11C1,9.8,0.5,17.1,-3.8,23.7C-8,30.2,-16.1,36,-21.2,34.9C-26.4,33.8,-28.6,25.8,-28.8,18.8C-28.9,11.9,-27,5.9,-33.8,-3.9C-40.6,-13.8,-56.2,-27.6,-56.8,-35.9C-57.4,-44.3,-43.1,-47.1,-31.2,-43.5C-19.2,-39.9,-9.6,-29.7,1.8,-32.8C13.1,-35.8,26.2,-52,29.7,-50.7Z" transform="translate(100 100)" />
                      </svg>
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D02337" d="M20.3,-44.8C23.4,-33.3,21.2,-22.1,33.4,-14.7C45.6,-7.3,72.2,-3.7,76.6,2.6C81,8.8,63.3,17.5,54.4,30.7C45.5,43.8,45.5,61.3,37.9,63.7C30.3,66.1,15.2,53.4,0.2,53C-14.7,52.6,-29.4,64.4,-37.6,62.4C-45.8,60.4,-47.5,44.4,-56.1,31.7C-64.6,19,-79.9,9.5,-74,3.4C-68.1,-2.7,-41,-5.4,-27.8,-10C-14.6,-14.5,-15.3,-21.1,-12.9,-33.1C-10.6,-45.2,-5.3,-62.8,1.6,-65.6C8.5,-68.4,17.1,-56.4,20.3,-44.8Z" transform="translate(100 100)" />
                      </svg>
                      Red
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Blue"
                        name="petColour"
                        checked={petState.petColour === "Blue"}
                        onChange={handleChange}
                      />
                      Blue
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Green"
                        name="petColour"
                        checked={petState.petColour === "Green"}
                        onChange={handleChange}
                      />
                      Green
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Yellow"
                        name="petColour"
                        checked={petState.petColour === "Yellow"}
                        onChange={handleChange}
                      />
                      Yellow
                    </label>
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <button className="btn btn-primary btn-block py-3" type="submit">
                    Create!
                  </button>
                </div>
              </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          )}
        </>
      ) : (
        <p>
          You need to be logged in to create a pet. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetForm;
