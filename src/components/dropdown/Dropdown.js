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

const Dropdown = ({ value, isGrouped, ...props }) => {

	// react-select has a terrible API. You need to pass the entire selected object as the `value` prop to prefill it.
	// instead, our component use the `value` prop, which is converted here
	let selectedValue;
	if (isGrouped) {
		props.options.find((group) => {
			const found = group.options.find((row) => row.value === value);
			if (found !== -1) {
				selectedValue = found;
				return true;
			}
		});
	} else {
		selectedValue = props.options.find((row) => row.value === value);
	}

	return (
		<Select
			{...props}
			value={selectedValue}
			styles={selectStyles}
		/>
	);
};

export default Dropdown;
