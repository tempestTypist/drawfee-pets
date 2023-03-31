import React from "react";
import { Form } from 'react-bootstrap';

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
		<Form.Check 
			id={id}
			name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
		/>
  );
};

export default Checkbox;
