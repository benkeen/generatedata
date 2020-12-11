import sinon from 'sinon';
import utils from '../../../../utils';
import { onmessage } from '../Alphanumeric.generator';
import { initialState } from '../Alphanumeric';

const i18n = require('../i18n/en.json');

describe('onmessage', () => {
	const postMessage = jest.fn();
	const importScripts = jest.fn();
	beforeAll(() => {
		window.postMessage = postMessage;
		window.importScripts = importScripts;
	});

	it('generates random data', () => {
		const payload: any = {
			data: {
				rowNum: 1,
				rowState: initialState.value,
				countryI18n: {},
				i18n,
				existingRowData: [],
				countryData: {},
				workerResources: {
					workerUtils: ''
				}
			}
		};

		sinon.stub(utils.randomUtils, 'generateRandomAlphanumericStr').returns('*****');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: '*****' });
	});
});
