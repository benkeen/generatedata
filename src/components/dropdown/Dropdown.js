import React from 'react';
import Select from 'react-select';

const selectStyles = {
	control: (provided) => ({
		...provided,
		minHeight: 20
	}),
	indicatorsContainer: (provided) => ({
		...provided,
		height: 28
	}),
	indicatorContainer: (provided) => ({
		...provided,
		padding: 5
	})
};

const Dropdown = (props) => (
	<Select {...props} styles={selectStyles} />
);

export default Dropdown;
