import * as React from 'react';
import Select from 'react-select';
import { getStrings } from '@generatedata/utils/lang';
import C from '@generatedata/config/constants';
import * as styles from './Dropdown.scss';

export type DropdownOption = {
	value: string;
	label: string;
};

const selectStyles = {
	control: (provided: any): any => ({
		...provided,
		minHeight: 20,
		boxShadow: 'none'
	}),
	indicatorsContainer: (provided: any): any => ({
		...provided,
		height: 28
	}),
	indicatorContainer: (provided: any): any => ({
		...provided,
		padding: 5
	}),
	menuPortal: (base: any): any => ({ ...base, zIndex: C.ZINDEXES.DIALOG })
};

const Dropdown = ({ value, isGrouped, options, hasError, placeholder, ...props }: any): JSX.Element => {
	const i18n = getStrings();

	// react-select has a terrible API. You need to pass the entire selected object as the `value` prop to prefill it.
	// That's not something you'd normally save - you just want to save a single value, because, well, duh. This makes
	// thing like localization a total pain. So to make it behave like a sane component, our component here just accepts
	// a single `value` prop - which is either the single value for the field, or an array if it's isMulti. This code
	// converts it to an object/array of objects for react-select
	let selectedValue: any = '';
	if (isGrouped) {
		if (props.isMulti) {
			selectedValue = [];
			options.filter(() => {
				// group: any
				// TODO
				return true;
			});
		} else {
			options.find((group: any) => {
				const found = group.options.find((row: any) => row.value === value);
				if (found && found !== -1) {
					selectedValue = found;
					return true;
				}
				return false;
			});
		}
	} else {
		if (props.isMulti) {
			selectedValue = options.filter((row: any): any => value.indexOf(row.value) !== -1);
		} else {
			selectedValue = options.find((row: any): any => row.value === value);
		}
	}

	const placeholderStr = placeholder ? placeholder : i18n.core.selectEllipsis;

	// for debugging: menuIsOpen={true}

	let className = props.className || '';
	if (hasError) {
		className += ` ${styles.error}`;
	}

	return (
		<Select
			{...props}
			className={className}
			options={options}
			classNamePrefix="react-select"
			value={selectedValue}
			styles={selectStyles}
			placeholder={placeholderStr}
			menuPlacement="auto"
			menuPortalTarget={document.body}
		/>
	);
};

export default Dropdown;
