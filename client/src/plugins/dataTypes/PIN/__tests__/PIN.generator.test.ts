import sinon from 'sinon';
import { onmessage } from '../PIN.generator';
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

		onmessage();
		expect(postMessage).toHaveBeenCalledWith({ display: 444 });
	});
});
