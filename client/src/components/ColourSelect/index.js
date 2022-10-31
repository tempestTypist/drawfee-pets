import React from 'react';

const ColourSelect = (props) => {
	const { handleChange } = props

	const changeHandler = (e) => {
		handleChange(e)
	}

  return (
		<div className="colour-chooser">

			<label htmlFor="color-red">
				<input 
					type="radio" 
					name="petColour" 
					className="color-red" 
					id="color-red" 
					value="Red"
					onChange={changeHandler}
					defaultChecked
				/>
				<div className="paint-color" />
				<div className="color-label">Red</div>
			</label>

			<label htmlFor="color-blue">
				<input 
					type="radio" 
					name="petColour" 
					className="color-blue" 
					id="color-blue" 
					value="Blue"
					onChange={changeHandler}
				/>
				<div className="paint-color" />
				<div className="color-label">Blue</div>
			</label>

			<label htmlFor="color-green">
				<input 
					type="radio" 
					name="petColour" 
					className="color-green" 
					id="color-green" 
					value="Green"
					onChange={changeHandler}
				/>
				<div className="paint-color" />
				<div className="color-label">Green</div>
			</label>

			<label htmlFor="color-yellow">
				<input 
					type="radio" 
					name="petColour" 
					className="color-yellow" 
					id="color-yellow"
					value="Yellow"
					onChange={changeHandler}
				/>
				<div className="paint-color" />
				<div className="color-label">Yellow</div>
			</label>

		</div>
  );
};

export default ColourSelect;
