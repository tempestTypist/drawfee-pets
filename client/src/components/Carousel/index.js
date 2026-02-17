import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ImageImport from '../../utils/imageimport';
import CarouselItem from '../CarouselItem'

const Carousel = (props) => {
	const { carouselItems, heading, selectedItem } = props 
	const headingId = `${heading.replace(/\s+/g, '-').toLowerCase()}`

	const [carousel, updateCarousel] = useState({
		items: [...carouselItems],
		currentItems: [],
		currentIndex: 0,
		direction: ""
	});

	console.log("carouselItems from props: " + [...carouselItems])

	const { items, currentIndex, currentItems } = carousel
	console.log("items from carousel state: " + items)
	// const images = ImageImport.importAll(require.context('../../assets/images/bots', true, /\.(png|jpe?g|svg)$/));

	const moveLeft = () => {
		let newIndex = currentIndex
		newIndex--
		let newActive = newIndex < 0 ? items.length - 1 : newIndex
		updateCarousel({ ...carousel, currentIndex: newActive, direction: 'left' });
	}

	const moveRight = () => {
		let newActive = (currentIndex + 1) % items.length
		updateCarousel({ ...carousel, currentIndex: newActive, direction: 'right' });
	}

	const handleSlideClick = (index) => {
		// console.log(event.target.firstChild)
		let newActive = index
		if (currentIndex !== newActive) {
			updateCarousel({ ...carousel, currentIndex: newActive });
		}
	}

	const imageLoaded = (event) => {
    event.target.style.opacity = 1
  }

	// const importPetImage = (id) => {
	// 	importImages(id)
	// }

	useEffect(() => {
		let listItems = []
		let level
		let className

		for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
				let index = i
				if (i < 0) {
						index = items.length + i
				} else if (i >= items.length) {
						index = i % items.length
				}
				level = currentIndex - i
				className = 'item level' + level
				if (currentIndex === index) className += ' item--current'

				switch (index) {
					case currentIndex:
						className += ' item--current'
						break;

					case (currentIndex - 1):
						className += ' item--previous'
						break;

					case (currentIndex + 1):
						className += ' item--next'
						break;
				}
				console.log("item index: " + items[index])

				listItems.push({ "index": index, "id": items[index].chassis, "class": className, "src": items[index].image })
		}
		updateCarousel({ ...carousel, currentItems: [...listItems] });
		selectedItem(items[currentIndex])
	}, [currentIndex]);

	return (
		<div className="carousel" aria-labelledby={headingId}>
			<div
				onClick={() => moveLeft()}
				className="controls controls--back">
					<FontAwesomeIcon icon={faAngleLeft} 
			/>
			</div>

			<ul className="item-list__wrapper">
				<h3 id={headingId} className="visuallyhidden">{heading}</h3>

				{currentItems.map((item, index) => (
					// console.log("items: " + JSON.stringify(item))
					<CarouselItem 
						index={index}
						id={item.id}
						src={item.src}
					/>
						// src={images[`MODEL-${model}/${item.id}/full-body.png`]}
					// />
					// <li 
					// 	key={index}
					// 	className={item.class}
					// 	onClick={() => handleSlideClick(item.index)} >
					// 	<div className="item__image-wrapper">
					// 		<img 
					// 			className="item__image"
					// 			alt={item.id}
					// 			name="chassis"
					// 			src={images[`MODEL-${model}/${item.id}/full-body.png`]}
					// 			onLoad={imageLoaded}
					// 		/>
					// 	</div>
					// 	<article className="item__content">
					// 		<h2 className="item__headline">{item.id}</h2>
					// 	</article>
					// </li>
				))}
			</ul>

			<div
				onClick={() => moveRight()}
				className="controls controls--next">
					<FontAwesomeIcon icon={faAngleRight} 
			/>
			</div>
		</div>
	);
}

export default Carousel;