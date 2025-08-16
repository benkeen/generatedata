import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteDataSetDialog from '../DeleteDataSetDialog.component';
const i18n = require('../../../../i18n/en.json');

const defaultProps = {
	visible: true,
	onClose: () => {},
	onDelete: () => {},
	i18n,
	dataSetName: 'Data Set Name'
};

describe('DeleteDataSetDialog', () => {
	it('clicking close calls the onClose callback', () => {
		const onClose = jest.fn();
		const { baseElement } = render(<DeleteDataSetDialog {...defaultProps} onClose={onClose} />);

		const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
		fireEvent.click(closeButton);
		expect(onClose).toBeCalled();
	});
});
