import React, { useState } from 'react';

import Slide from '../Slide'

const Slider = (props) => {

  const [sliderState, setSliderState] = useState({current: 0})

  const { pets, heading } = props 
  console.log(pets)
  const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
  const wrapperTransform = {
    'transform': `translateX(-${sliderState.current * (100 / pets.length)}%)`
  }

  const handlePreviousClick = () => {
    const previous = sliderState.current - 1
        
    setSliderState({ 
      current: (previous < 0) 
        ? pets.length - 1
        : previous
    })
  }
  
  const handleNextClick = () => {
    const next = sliderState.current + 1;
    
    setSliderState({ 
      current: (next === pets.length) 
        ? 0
        : next
    })
  }
  
  const handleSlideClick = (index) => {
    if (sliderState.current !== index) {
      setSliderState({
        current: index
      })
    }
  }

  return (

  <div className='slider' aria-labelledby={headingId}>
    <div className="arrow arrow-left" onClick={handlePreviousClick}><i className="fi-arrow-left"></i></div>

      <ul className="slider__wrapper" style={wrapperTransform}>
        <h3 id={headingId} class="visuallyhidden">{heading}</h3>
        {pets.map((pet, index) => {
          return (
            <Slide
              key={index}
              index={index}
              pet={pet}
              current={sliderState.current}
              handleSlideClick={handleSlideClick}
            />
          )
        })}
      </ul>

    <div className="arrow arrow-right" onClick={handleNextClick}><i className="fi-arrow-right"></i></div>
  </div>

  // <div className='slider' aria-labelledby={headingId}>
    
  //   <ul className="slider__wrapper" style={wrapperTransform}>
  //     <h3 id={headingId} class="visuallyhidden">{heading}</h3>

  //     {pets.map((pet, index) => {
  //       return (
  //         <Slide
  //           key={index}
  //           index={index}
  //           pet={pet}
  //           current={sliderState.current}
  //           handleSlideClick={handleSlideClick}
  //         />
  //       )
  //     })}

  //   </ul>
    
  //   <div className="slider__controls">
  //     <button className={`btn btn--previous`} title="Go to previous slide" onClick={handlePreviousClick}>
  //       <svg className="icon" viewBox="0 0 24 24">
  //         <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  //       </svg>
  //     </button>
  //     <button className={`btn btn--next`} title="Go to next slide" onClick={handleNextClick}>
  //       <svg className="icon" viewBox="0 0 24 24">
  //         <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  //       </svg>
  //     </button>
  //   </div>
  // </div>
  );
};

export default Slider;