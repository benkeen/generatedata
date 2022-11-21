import * as React from 'react';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { DropdownOption } from '../dropdown/Dropdown';
import { ErrorTooltip } from '~components/tooltips';
import { arrayMove } from '~utils/arrayUtils';
import styles from './CreatablePillField.scss';

export const SortableMultiValue = SortableElement((props: any) => {
	const onMouseDown = (e: any): void => {
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

const SortableCreatableSelect: any = SortableContainer(CreatableSelect);

export type CreatablePillFieldProps = {
	onChange: (newValues: string[]) => void;
	value: string[];
	error: string;
	placeholder: string;
	onValidateNewItem?: (value: string) => boolean;
	className?: string;
	isClearable?: boolean;
}

const CreatablePillField = ({
	onChange,
	onValidateNewItem,
	value,
	error,
	placeholder,
	className,
	isClearable = true
}: CreatablePillFieldProps): JSX.Element => {
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
				if (onValidateNewItem) {
					const isValid = onValidateNewItem(tempValue);
					if (!isValid) {
						return;
					}
				}
				setTempValue('');
				onChange([...value, tempValue]);
				e.preventDefault();
		}
	};

	const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
		const sortedOptions = arrayMove(options, oldIndex, newIndex);
		onChange(sortedOptions.map((i: DropdownOption) => i.value));
	};

	const classes: string[] = [];
	if (className) {
		classes.push(className);
	}
	if (error) {
		classes.push(styles.errorField);
	}

	// onCreateOption={(a: any) => console.log(a)}
	return (
		<ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
			<SortableCreatableSelect
				className={classes.join(' ')}
				styles={selectStyles}
				components={customComponents}
				inputValue={tempValue}
				axis="xy"
				distance={4}
				getHelperDimensions={({ node }: any): any => node.getBoundingClientRect()}
				isClearable={isClearable}
				isMulti
				onSortEnd={onSortEnd}
				menuIsOpen={false}
				onChange={(options: any): void => {
					const newValues = options ? options.map(({ value }: DropdownOption) => value) : [];
					onChange(newValues);
				}}
				onInputChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				value={options}
				menuPlacement="auto"
				menuPortalTarget={document.body}
			/>
		</ErrorTooltip>
	);
};
CreatablePillField.defaultProps = {
	placeholder: 'Press enter to create item',
	error: ''
};

export default CreatablePillField;
