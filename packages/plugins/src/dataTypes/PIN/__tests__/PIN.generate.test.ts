import sinon from 'sinon';
import { onmessage } from '../PIN.worker';
import utils from '~utils/index';

describe('onmessage', () => {
	const postMessage = jest.fn();
	const importScripts = jest.fn();
	beforeAll(() => {
		window.postMessage = postMessage;
		window.importScripts = importScripts;
	});

	it('generates random data', () => {
		sinon.stub(utils.randomUtils, 'getRandomNum').returns(444);

		const payload: any = {
			data: {
				workerUtilsUrl: ''
			}
		};

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 444 });
	});
});
