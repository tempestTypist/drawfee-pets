import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_PET, FAVOURITE_PET } from '../../utils/mutations';
import { QUERY_PETS, QUERY_ME } from '../../utils/queries';

import { CSSTransition } from 'react-transition-group';

import ChooserItem from '../ChooserItem'

import ALLPETS from '../../assets/images/index.js'

const PetChooser = (props) => {
    const items = props.items;
    const active = props.active;

    const [carouselState, setCarouselState] = useState({ items: [{ key: '', id: '', level: '' }], active: active, direction: '' });
    const [carouselItems, setCarouselItems] = useState(items)

    useEffect(() => {
        let listItems = []
        let level
        let active = carouselState.active
        //active prop tells us where in the array we want the carousel to start
        //let i = active - 2 sets a variable before the loop starts
        //i < active + 3 defines the condition for the loop to run (i must be less than active + 3)
        // i++ increment each loop
        for (let i = active - 2; i < active + 3; i++) {
            // if the middle image/image set to active is the first image in array [0], take
            // the number of items in the list and minus 2
            // which sets the 'first' image as the second to last in the array
            // because the loop increments each time, it'll set the 'second' image as the last array item next,
            // incrementing to -1
            let index = i
            if (i < 0) {
                index = carouselItems.length + i
            } else if (i >= carouselItems.length) {
                index = i % carouselItems.length
            }
            level = active - i
            listItems.push({key: index, id: carouselItems[index], level: level })
        }
        setCarouselState({items: [...listItems], active: active, direction: '' })
      }, [carouselState.direction]);
    
    //left arrow function
    //updates active state and direction state
    const moveLeft = () => {
        console.log("Left arrow clicked.")

        let newActive = carouselState.active
        newActive--

        setCarouselState({
            items: [carouselState.items],
            active: newActive < 0 ? carouselItems.length - 1 : newActive,
            direction: 'left'
        })

        console.log("Move left complete!")
    }
    
    //right arrow function
    //updates active state and direction state
    const moveRight = () => {
        console.log("Right arrow clicked.")

        let newActive = carouselState.active
        setCarouselState({
            items: [carouselState.items],
            active: (newActive + 1) % carouselItems.length,
            direction: 'right'
        })

        console.log("Move right complete!")
    }

    const newItems = carouselState.items
    
  return (
    <div className="pet-chooser noselect">
      <div className="arrow arrow-left" onClick={moveLeft}><i className="fi-arrow-left"></i></div>
          {/* {generateItems()} */}
          {newItems.map((item) => (
            <ChooserItem key={item.key} id={item.id} level={item.level} />
          ))}
      <div className="arrow arrow-right" onClick={moveRight}><i className="fi-arrow-right"></i></div>
    </div>
  );
};

export default PetChooser;
