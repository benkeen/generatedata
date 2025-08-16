import sinon from 'sinon';
import utils from '../../../../utils';
import { onmessage } from '../Alphanumeric.worker';
import { initialState } from '../Alphanumeric.state';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';

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
				...getBlankDTGeneratorPayload(),
				rowState: {
					value: initialState.value
				},
				i18n
			}
		};

		sinon.stub(utils.randomUtils, 'generateRandomAlphanumericStr').returns('*****');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: '*****' });
	});
});
