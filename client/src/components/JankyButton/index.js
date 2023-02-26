import React from 'react';
import { Button } from 'react-bootstrap';

const JankyButton = ({type, label, ...props}) => {

  return (
	<div className="btn-janky-wrapper">
		<Button 
			type={type} 
			variant={props.variant} 
			size={props.size} 
			className="btn-janky"
			href={props.href}
			>
			{label}
		</Button>
	</div>
  );
};

export default JankyButton;