import * as React from 'react';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { DropdownOption } from './dropdown/Dropdown';

function arrayMove(array: any, from: number, to: number) {
	array = array.slice();
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
	return array;
}

const SortableMultiValue = SortableElement((props: any) => {
	const onMouseDown = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const innerProps = { onMouseDown };
	return <components.MultiValue {...props} innerProps={innerProps} />;
});

const customComponents = {
	DropdownIndicator: null,
	MultiValue: SortableMultiValue
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
		...base,
		backgroundColor: '#e0ebfd'
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

const SortableCreatableSelect = SortableContainer(CreatableSelect);

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

	const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
		const sortedOptions = arrayMove(options, oldIndex, newIndex);
		onChange(sortedOptions.map((i: DropdownOption) => i.value));
	};

	return (
		<SortableCreatableSelect
			styles={selectStyles}
			components={customComponents}
			inputValue={tempValue}
			axis="xy"
			distance={4}
			getHelperDimensions={({ node }) => node.getBoundingClientRect()}
			isClearable
			isMulti
			onSortEnd={onSortEnd}
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
