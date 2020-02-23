import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import { DropdownOption } from './Dropdown';

const components = {
	DropdownIndicator: null,
};

const selectStyles = {
	// control: (base: React.CSSProperties): any => ({
	// 	...base,
	// 	minHeight: 20,
	// 	height: 30,
	// 	boxShadow: 'none',
	// 	padding: 0,
	// 	margin: 0
	// }),
	// // container: (base: React.CSSProperties): any => ({
	// // 	...base,
	// // 	height: 30
	// // }),
	// // menu: (base: React.CSSProperties) => ({
	// // 	...base,
	// // 	margin: 0
	// // }),
	// menuList: (base: React.CSSProperties) => ({
	// 	...base,
	// 	paddingTop: 0,
	// 	paddingBottom: 0
	// }),
	// multiValue: (base: React.CSSProperties) => ({
	// 	...base,
	// 	margin: 0
	// }),
	// menuPortal: (base: any): any => ({ ...base, zIndex: 1400 }) // drawer is 1300

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
		...base,
		// backgroundColor: variables.colorPrimaryLighter
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

const createOption = (label: string): DropdownOption => ({
	label,
	value: label,
});

export default class CreatableInputOnly extends React.Component<any, any> {
	state = {
		inputValue: '',
		value: [],
	};

	handleChange = (value: any, actionMeta: any): void => {
		console.group('Value Changed');
		console.log(value);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
		this.setState({ value });
	};

	handleInputChange = (inputValue: string): void => {
		this.setState({ inputValue });
	};

	handleKeyDown = (event: any): void => {
		const { inputValue, value } = this.state;
		if (!inputValue) {
			return;
		}

		switch (event.key) {
			case 'Enter':
			case 'Tab':
				// console.log([...value, createOption(inputValue)]);
				this.setState({
					inputValue: '',
					value: [...value, createOption(inputValue)],
				});
				event.preventDefault();
		}
	};

	render(): JSX.Element {
		const { inputValue, value } = this.state;
		return (
			<CreatableSelect
				styles={selectStyles}
				components={components}
				inputValue={inputValue}
				isClearable
				isMulti
				menuIsOpen={false}
				onChange={this.handleChange}
				onInputChange={this.handleInputChange}
				onKeyDown={this.handleKeyDown}
				placeholder="Type something and press enter..."
				value={value}
				menuPlacement="auto"
				menuPortalTarget={document.body}
			/>
		);
	}
}
