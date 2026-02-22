import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import CarouselItem from '../CarouselItem'

const Carousel = (props) => {
	const { carouselItems, heading, selectedItem } = props 
	
	const headingId = `${heading.replace(/\s+/g, '-').toLowerCase()}`

	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(null);

	const isMobile = window.innerWidth < 768;
	const visibleRange = isMobile ? 1 : 2;

	const currentItems = [];

	for (let i = currentIndex - visibleRange; i <= currentIndex + visibleRange; i++) {
		let index = i;

		if (i < 0) index = carouselItems.length + i;
		else if (i >= carouselItems.length) index = i % carouselItems.length;

		const level = currentIndex - i;
		let className = 'item level' + level;

		const previousIndex =
			(currentIndex - 1 + carouselItems.length) % carouselItems.length;

		const nextIndex =
			(currentIndex + 1) % carouselItems.length;

		if (index === currentIndex) {
			className += ' item--current';
		} else if (index === previousIndex) {
			className += ' item--previous';
		} else if (index === nextIndex) {
			className += ' item--next';
		}

		currentItems.push({
			index,
			className,
			id: carouselItems[index].id,
			src: carouselItems[index].image
		});
	}

	const moveLeft = () => {
		const newIndex =
			currentIndex - 1 < 0
				? carouselItems.length - 1
				: currentIndex - 1;

		setDirection('left');
		setCurrentIndex(newIndex);
		selectedItem(carouselItems[newIndex].id);
	}

	const moveRight = () => {
		const newIndex =
			(currentIndex + 1) % carouselItems.length;

		setDirection('right');
		setCurrentIndex(newIndex);
		selectedItem(carouselItems[newIndex].id);
	}

	const handleSlideClick = (index) => {
		if (index !== currentIndex) {
			setDirection(index > currentIndex ? 'right' : 'left');
			setCurrentIndex(index);
			selectedItem(carouselItems[index].id);
		}
	}

	const getAnimation = (className) => {
		const springStrong = {
			type: "spring",
			stiffness: 260,
			damping: 25
		};

		const springMedium = {
			type: "spring",
			stiffness: 200,
			damping: 30
		};

		const springSoft = {
			type: "spring",
			stiffness: 150,
			damping: 35
		};

		if (className.includes("level-2")) {
			return {
				scale: 0.75,
				opacity: 0.5,
				boxShadow: "0px 0px 0px rgba(0,0,0,0)",
				zIndex: 1,
				transition: springSoft
			};
		}

		if (className.includes("level-1")) {
			return {
				scale: 0.9,
				opacity: 0.8,
				boxShadow: "0px 0px 0px rgba(0,0,0,0)",
				zIndex: 2,
				transition: springMedium
			};
		}

		if (className.includes("level0")) {
			return {
				scale: 1,
				opacity: 1,
				boxShadow: "0px 0px 25px rgba(0,255,255,0.7)",
				zIndex: 3,
				transition: springStrong
			};
		}

		if (className.includes("level1")) {
			return {
				scale: 0.9,
				opacity: 0.8,
				boxShadow: "0px 0px 0px rgba(0,0,0,0)",
				zIndex: 2,
				transition: springMedium
			};
		}

		if (className.includes("level2")) {
			return {
				scale: 0.75,
				opacity: 0.5,
				boxShadow: "0px 0px 0px rgba(0,0,0,0)",
				zIndex: 1,
				transition: springSoft
			};
		}
		
		return {};
	};

	useEffect(() => {
		if (!carouselItems || carouselItems.length === 0) return null;
	}, [currentIndex, carouselItems]);


	return (
		<div className="carousel" aria-labelledby={headingId}>
			<div
				onClick={() => moveLeft()}
				className="controls controls--back">
					<FontAwesomeIcon icon={faAngleLeft} />
			</div>

			<h3 id={headingId} className="visuallyhidden">{heading}</h3>
			<ul className="item-list__wrapper">
				{currentItems.map((item) => (
					<CarouselItem
						key={item.id}
						item={item}
						handleSlideClick={handleSlideClick}
						getAnimation={getAnimation}
					/>
				))}

			</ul>

			<div
				onClick={() => moveRight()}
				className="controls controls--next">
					<FontAwesomeIcon icon={faAngleRight} />
			</div>
		</div>
	);
}

export default Carousel;