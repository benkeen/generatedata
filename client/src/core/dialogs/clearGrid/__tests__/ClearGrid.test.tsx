import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import ClearGrid from '../ClearGrid.component';
const i18n = require('../../../../i18n/en.json');

jest.mock('copy-to-clipboard', () => {
	return jest.fn();
});

const defaultProps = {
	visible: true,
	onClose: () => {},
	onClear: () => {},
	i18n
};

describe('ClearGrid', () => {

	it('clicking "No" calls onClose', () => {
		const onClose = jest.fn();
		const { baseElement } = render(
			<ClearGrid
				{...defaultProps}
				onClose={onClose}
			/>
		);

		const closeButton = baseElement.querySelector('.cancelClearGrid') as HTMLButtonElement;
		fireEvent.click(closeButton);
		expect(onClose).toHaveBeenCalled();
	});

	it('clicking Yes calls onClear with "dataOnly" by default', () => {
		const onClear = jest.fn();
		const { baseElement } = render(
			<ClearGrid
				{...defaultProps}
				onClear={onClear}
			/>
		);

		const yesButton = baseElement.querySelector('.clearGrid') as HTMLButtonElement;
		fireEvent.click(yesButton);
		expect(onClear).toHaveBeenCalledWith('dataOnly');
	});

	it('clicking Yes calls onClear with "dataOnly" by default', () => {
		const onClear = jest.fn();
		const { baseElement } = render(
			<ClearGrid
				{...defaultProps}
				onClear={onClear}
			/>
		);

		const yesButton = baseElement.querySelector('.clearGrid') as HTMLButtonElement;
		fireEvent.click(yesButton);
		expect(onClear).toHaveBeenCalledWith('dataOnly');
	});

	it('choosing second option calls onClear with "everything"', () => {
		const onClear = jest.fn();
		const { baseElement } = render(
			<ClearGrid
				{...defaultProps}
				onClear={onClear}
			/>
		);

		fireEvent.click(baseElement.querySelector('#gdClearPageOption2') as HTMLInputElement);

		const yesButton = baseElement.querySelector('.clearGrid') as HTMLButtonElement;
		fireEvent.click(yesButton);

		expect(onClear).toHaveBeenCalledWith('everything');


		fireEvent.click(baseElement.querySelector('#gdClearPageOption1') as HTMLInputElement);

		const noButton = baseElement.querySelector('.clearGrid') as HTMLButtonElement;
		fireEvent.click(noButton);

		expect(onClear).toHaveBeenCalledWith('dataOnly');
	});
});
