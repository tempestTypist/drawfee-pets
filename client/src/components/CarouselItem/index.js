import React from 'react';
import ImageImport from '../../utils/imageimport';

const CarouselItem = (props) => {
  const { index, active, id, level } = props 
	const slideClick = props.handleSlideClick
	const images = ImageImport.importAll(require.context('../../assets/images/pets', false, /\.(png|jpe?g|svg)$/));
	let className = 'item level' + level

	if (active === index) className += ' item--current'
	else if (active - 1 === index) className += ' item--previous'
	else if (active + 1 === index) className += ' item--next'

	const handleSlideClick = () => {
    slideClick(index)
  }

	const imageLoaded = (event) => {
    event.target.style.opacity = 1
  }

	return (
	<li 
		className={className}
		onClick={handleSlideClick} >
		<div className="item__image-wrapper">
			<img 
				className="item__image"
				alt={id}
				name="petSpecies"
				src={images[`${id}.png`]}
				onLoad={imageLoaded}
			/>
		</div>
		<article className="item__content">
			<h2 className="item__headline">{id}</h2>
		</article>
	</li>
	);
}

export default CarouselItem;