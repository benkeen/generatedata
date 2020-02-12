import * as React from 'react';
// import Select, { ControlProps, OptionTypeBase, IndicatorProps } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const components = {
	DropdownIndicator: null,
};

const selectStyles = {
	control: (base: React.CSSProperties): any => ({
		...base,
		minHeight: 20,
		boxShadow: 'none',
		padding: 0,
		margin: 0
	}),
	menu: (base: React.CSSProperties) => ({
		...base,
		margin: 0
	}),
	menuList: (base: React.CSSProperties) => ({
		...base,
		paddingTop: 0,
		paddingBottom: 0
	}),
	menuPortal: (base: any): any => ({ ...base, zIndex: 1400 }) // drawer is 1300
};

const createOption = (label: string) => ({
	label,
	value: label,
});

export default class CreatableInputOnly extends React.Component<any, any> {
	state = {
		inputValue: '',
		value: [],
	};

	handleChange = (value: any, actionMeta: any) => {
		console.group('Value Changed');
		console.log(value);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
		this.setState({ value });
	};

	handleInputChange = (inputValue: string) => {
		this.setState({ inputValue });
	};

	handleKeyDown = (event: any) => {
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

	render() {
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
