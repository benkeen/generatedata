import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import ClearPageDialog, { ClearPageType } from '../ClearPage.component';
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

describe('ClearPageDialog', () => {

	it('clicking "No" calls onClose', () => {
		const onClose = jest.fn();
		const { baseElement } = render(
			<ClearPageDialog
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
			<ClearPageDialog
				{...defaultProps}
				onClear={onClear}
			/>
		);

		const yesButton = baseElement.querySelector('.clearPage') as HTMLButtonElement;
		fireEvent.click(yesButton);
		expect(onClear).toHaveBeenCalledWith(ClearPageType.dataOnly);
	});

	it('clicking Yes calls onClear with "dataOnly" by default', () => {
		const onClear = jest.fn();
		const { baseElement } = render(
			<ClearPageDialog
				{...defaultProps}
				onClear={onClear}
			/>
		);

		const yesButton = baseElement.querySelector('.clearPage') as HTMLButtonElement;
		fireEvent.click(yesButton);
		expect(onClear).toHaveBeenCalledWith(ClearPageType.dataOnly);
	});

	it('choosing second option calls onClear with "everything"', () => {
		const onClear = jest.fn();
		const { baseElement } = render(
			<ClearPageDialog
				{...defaultProps}
				onClear={onClear}
			/>
		);

		fireEvent.click(baseElement.querySelector('#gdClearPageOption2') as HTMLInputElement);

		const yesButton = baseElement.querySelector('.clearPage') as HTMLButtonElement;
		fireEvent.click(yesButton);

		expect(onClear).toHaveBeenCalledWith('everything');

		fireEvent.click(baseElement.querySelector('#gdClearPageOption1') as HTMLInputElement);

		const noButton = baseElement.querySelector('.clearPage') as HTMLButtonElement;
		fireEvent.click(noButton);

		expect(onClear).toHaveBeenCalledWith(ClearPageType.dataOnly);
	});
});
