import sinon from 'sinon';
import { onmessage } from '../Phone.generator';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';
import utils from '~utils/index';

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
				...getBlankDTGeneratorPayload()
			}
		};

		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns(0);
		sinon.stub(utils.randomUtils, 'generateRandomAlphanumericStr').returns('converted');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 'converted' });
	});
});
