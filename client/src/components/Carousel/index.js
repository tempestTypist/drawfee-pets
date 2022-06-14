import React, { useState, useEffect } from 'react';
import CarouselItem from '../CarouselItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ALLPETS from '../../assets/images';

const Carousel = (props) => {
	const { carouselItems, heading, selectPet } = props 
	const headingId = `${heading.replace(/\s+/g, '-').toLowerCase()}`

	const [app, updateApp] = useState({
		items: [...carouselItems],
		currentItems: [],
		currentIndex: 0,
		direction: ""
	});

	const { items, currentIndex, currentItems } = app

	const moveLeft = () => {
		let newIndex = currentIndex
		newIndex--
		let newActive = newIndex < 0 ? items.length - 1 : newIndex
		updateApp({ ...app, currentIndex: newActive, direction: 'left' });
	}

	const moveRight = () => {
		let newActive = (currentIndex + 1) % items.length
		updateApp({ ...app, currentIndex: newActive, direction: 'right' });
	}

	const handleSlideClick = (index) => {
		// console.log(event.target.firstChild)
		let newActive = index
		if (currentIndex !== newActive) {
			updateApp({ ...app, currentIndex: newActive });
		}
	}

	const imageLoaded = (event) => {
    event.target.style.opacity = 1
  }

useEffect(() => {
	let listItems = []
	let level
	let className
	console.log("currentIndex pre-card generation is: " + currentIndex)

	for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
			let index = i
			console.log("Loop begins-------")
			console.log("Starting variable: " + i)
			if (i < 0) {
				console.log("Starting variable " + i + " is less than 0.")
					index = items.length + i
					console.log("index set to: " + index)
			} else if (i >= items.length) {
				console.log("Starting variable " + i + " is equal to or greater than the number of items in the list.")
					index = i % items.length
					console.log("index set to: " + index)
			}
			level = currentIndex - i
			className = 'item level' + level
			console.log("Testing % " + (currentIndex % items.length))
			if (currentIndex === index) className += ' item--current'
			//we start with 'if the current index/active item is the same as the index we are setting in this for loop,
			//then set the class

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

			console.log("Pushing item...")
			console.log("Item key: " + index)
			console.log("Item ID: " + items[index])
			console.log("Item level: " + level)
			console.log("_____________________")
			listItems.push({ "index": index, "id": items[index], "class": className })
			// <CarouselItem key={index} index={index} id={items[index]} level={level} handleSlideClick={handleSlideClick} />
	}
	updateApp({ ...app, currentItems: [...listItems] });
	selectPet(items[currentIndex])
}, [currentIndex]);

	return (
		<div className="carousel" aria-labelledby={headingId}>
			<div
				onClick={() => moveLeft()}
				className="controls controls--back">
					<FontAwesomeIcon icon={faArrowLeft} 
			/>
			</div>

			<ul className="item-list__wrapper">
				<h3 id={headingId} className="visuallyhidden">{heading}</h3>
				{/* {generateItems()} */}

				{currentItems.map((item) => (
					<li 
						key={item.index}
						className={item.class}
						onClick={() => handleSlideClick(item.index)} >
						<div className="item__image-wrapper">
							<img 
								className="item__image"
								alt={item.id}
								name="petSpecies"
								src={ALLPETS[item.id]}
								onLoad={imageLoaded}
							/>
						</div>
						<article className="item__content">
							<h2 className="item__headline">{item.id}</h2>
						</article>
					</li>
				))}
			</ul>

			<div
				onClick={() => moveRight()}
				className="controls controls--next">
					<FontAwesomeIcon icon={faArrowRight} 
			/>
			</div>
		</div>
	);
}

export default Carousel;