import ImageImport from '../../utils/imageimport';
import { Image } from 'react-bootstrap';

const CarouselItem = (props) => {
  const { index, active, id, src, level } = props 
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
		key={index}
		className={className}
		onClick={handleSlideClick} >
		<div className="item__image-wrapper">
			{/* <img 
				className="item__image"
				alt={id}
				name="chassis"
				src={src}
				onLoad={imageLoaded}
			/> */}
			<Image 
				className="item__image" 
				name="chassis"
				src={src} 
				alt={id} 
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