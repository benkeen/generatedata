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
		minHeight: 30,
		maxHeight: 100,
		overflow: 'scroll'
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
	container: (base: React.CSSProperties): React.CSSProperties => ({
		...base,

	}),
	input: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		margin: 0,
		padding: 0
	}),
	indicatorsContainer: (base: React.CSSProperties): React.CSSProperties => ({
		...base,
		alignItems: 'flex-start'
	})
};

export const createOption = (label: string): DropdownOption => ({
	label,
	value: label,
});

const CreatablePillField = ({ onChange, value }: any) => {
	const [tempValue, setTempValue] = React.useState('');
	const options = value.map(createOption);

	const handleInputChange = (newTempValue: string): void => setTempValue(newTempValue);

	const handleKeyDown = (e: any): void => {
		if (!tempValue) {
			return;
		}
		switch (e.key) {
			case 'Enter':
			case 'Tab':
				setTempValue('');
				onChange([...value, tempValue]);
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
			onChange={(options) => {
				const newValues = options ? options.map(({ value }: DropdownOption) => value) : [];
				onChange(newValues);
			}}
			onInputChange={handleInputChange}
			onKeyDown={handleKeyDown}
			placeholder="Press enter to create item"
			value={options}
			menuPlacement="auto"
			menuPortalTarget={document.body}
		/>
	);
};

export default CreatablePillField;
