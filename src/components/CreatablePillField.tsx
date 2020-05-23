import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import { DropdownOption } from './dropdown/Dropdown';

const components = {
	DropdownIndicator: null,
};

const selectStyles = {
	control: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		boxShadow: 'none',
		minHeight: 30
	}),
	dropdownIndicator: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		padding: 4
	}),
	clearIndicator: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		padding: 4
	}),
	multiValue: (base: React.CSSProperties): React.CSSProperties => ({
		...base
	}),
	valueContainer: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		padding: '0px 2px'
	}),
	input: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		margin: 0,
		padding: 0
	})
};

export const createOption = (label: string): DropdownOption => ({
	label,
	value: label,
});

const CreatablePillField = ({ onChange, value }: any) => {
	const [tempValue, setTempValue] = React.useState('');

	const handleChange = (newValue: any): void => {
		onChange(newValue);
	};

	const handleInputChange = (newTempValue: string): void => {
		setTempValue(newTempValue);
	};

	const handleKeyDown = (e: any): void => {
		if (!tempValue) {
			return;
		}
		switch (e.key) {
			case 'Enter':
			case 'Tab':
				onChange({
					inputValue: '',
					value: [...value, createOption(tempValue)],
				});
				e.preventDefault();
		}
	};

	return (
		<CreatableSelect
			styles={selectStyles}
			components={components}
			inputValue={tempValue}
			isClearable
			isMulti
			menuIsOpen={false}
			onChange={(newValue) => onChange(newValue)}
			onInputChange={handleInputChange}
			onKeyDown={handleKeyDown}
			placeholder="Type something and press enter..."
			value={value}
			menuPlacement="auto"
			menuPortalTarget={document.body}
		/>
	);
};

export default CreatablePillField;






















