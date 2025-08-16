import sinon from 'sinon';
import { onmessage } from '../CVV.worker';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';
import utils from '~utils/index';

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
				i18n
			}
		};

		sinon.stub(utils.randomUtils, 'getRandomNum').onCall(0).returns(123);

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 123 });
	});
});
