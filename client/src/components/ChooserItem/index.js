import React, { useState } from 'react';
import ALLPETS from '../../assets/images';

const ChooserItem = (props) => {

  const [level, setLevel] = useState({ level: props.level });
  const className = 'item level' + props.level

  return(
      <div className={className}>
          <img id={props.id} src={ALLPETS[props.id]} className="img-fluid" />
      </div>
  )
};

export default ChooserItem;


// const [myArray, updateMyArray] = useState([]);

// const onClick = () => {
//     updateMyArray( arr => [...arr, `${arr.length}`]);
// };
// return [
//     <input type="button" onClick={ onClick } value="Update" />,

//     <div>{myArray.map( e =>
//       <div>{ e }</div>
//     )}
//     </div>
// ];