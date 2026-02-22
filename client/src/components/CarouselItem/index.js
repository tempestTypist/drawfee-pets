import { motion } from "framer-motion"

const CarouselItem = ({ item, handleSlideClick, getAnimation }) => {

  return (
    <motion.li
      key={`${item.id}`}
      className={item.className}
      onClick={() => handleSlideClick(item.index)}
      initial={false}
      animate={getAnimation(item.className)}
      layout
    >
      <div className="item__image-wrapper">
        <motion.img
          className="item__image"
          src={item.src}
          alt={item.id}
        />
      </div>

      <article className="item__content">
        <h2 className="item__headline">{item.id}</h2>
      </article>
    </motion.li>
  );
};

export default CarouselItem;






// import * as motion from "motion/react-client"
// import { Image } from 'react-bootstrap';

// const CarouselItem = (props) => {
//   const { index, id, className, src, direction, handleSlideClick } = props 

// const getAnimation = (className, direction) => {
//   const baseOffset = 220;
//   const farOffset = 380;

//   // Directional push effect
//   const directionalShift = direction === "left" ? -40 : 40;

//   if (className.includes("level0")) {
//     return {
//       x: 0,
//       scale: 1.1,
//       opacity: 1,
//       zIndex: 3,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 20
//       }
//     };
//   }

//   if (className.includes("level1")) {
//     return {
//       x: -baseOffset + directionalShift,
//       scale: 0.9,
//       opacity: 0.8,
//       zIndex: 2,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25
//       }
//     };
//   }

//   if (className.includes("level-1")) {
//     return {
//       x: baseOffset + directionalShift,
//       scale: 0.9,
//       opacity: 0.8,
//       zIndex: 2,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25
//       }
//     };
//   }

//   if (className.includes("level2")) {
//     return {
//       x: -farOffset + directionalShift,
//       scale: 0.75,
//       opacity: 0.5,
//       zIndex: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     };
//   }

//   if (className.includes("level-2")) {
//     return {
//       x: farOffset + directionalShift,
//       scale: 0.75,
//       opacity: 0.5,
//       zIndex: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     };
//   }

//   return {};
// };



// 	const imageLoaded = (event) => {
//     event.target.style.opacity = 1
//   }

// 	return (
// 	<motion.li 
// 		key={id}
// 		className={className}
// 		onClick={() => handleSlideClick(index)} 
// 		initial={false}
//   	animate={getAnimation(className, direction)}
//   	transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
// 	>
// 		<div className="item__image-wrapper">
// 			<Image 
// 				className="item__image" 
// 				name="chassis"
// 				src={src} 
// 				alt={id} 
// 				onLoad={imageLoaded}
// 			/>
// 		</div>
// 		<article className="item__content">
// 			<h2 className="item__headline">{id}</h2>
// 		</article>
// 	</motion.li>
// 	);
// }

// export default CarouselItem;