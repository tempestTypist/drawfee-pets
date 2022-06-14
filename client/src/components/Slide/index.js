import React from 'react';
import ALLPETS from '../../assets/images';

const Slide = (props) => {

	const { pet, current, index } = props
	const slideClick = props.handleSlideClick
	let classNames = 'slide'
	
	if (current === index) classNames += ' slide--current'
	else if (current - 1 === index) classNames += ' slide--previous'
	else if (current + 1 === index) classNames += ' slide--next'

  const handleSlideClick = (event) => {
    slideClick(index)
  }
  
  const imageLoaded = (event) => {
    event.target.style.opacity = 1
  }

  return (
	<li 
		className={classNames}
		onClick={handleSlideClick} >
		<div className="slide__image-wrapper">
			<img 
				className="slide__image"
				alt={pet}
				src={ALLPETS[pet]}
				onLoad={imageLoaded}
			/>
		</div>
		
		<article className="slide__content">
			<h2 className="slide__headline">{pet}</h2>
		</article>
	</li>
  );
};

export default Slide;