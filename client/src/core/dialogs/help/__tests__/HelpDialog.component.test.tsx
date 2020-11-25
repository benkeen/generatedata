import React from 'react'
import sinon from 'sinon';
import { render, fireEvent } from '@testing-library/react';
import HelpDialog from '../HelpDialog.component';
import { DataTypeFolder } from '../../../../../_plugins';
import * as langUtils from '~utils/langUtils';
import * as dataTypeUtils from '~utils/dataTypeUtils';
const i18n = require('../../../../i18n/en.json');
const NamesI18n = require('../../../../plugins/dataTypes/Names/i18n/en.json');

const defaultProps = {
	initialDataType: 'Names' as DataTypeFolder,
	visible: true,
	onClose: () => {},
	coreI18n: i18n,
	dataTypeI18n: {
		Names: NamesI18n
	},
	onSelectDataType : () => {}
};

describe('HelpDialog', () => {
	it('clicking close calls the onClose callback', () => {
		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {
				Names: NamesI18n
			}
		});
		sinon.stub(dataTypeUtils, 'getSortedGroupedDataTypes').returns([{
			label: 'Blah',
			options: [
				{ value: 'Names', label: 'Names' }
			]
		}]);

		const onClose = jest.fn();
		const { baseElement } = render(
			<HelpDialog
				{...defaultProps}
				onClose={onClose}
			/>
		);

		const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
		fireEvent.click(closeButton);
		expect(onClose).toBeCalled();
	});
});
