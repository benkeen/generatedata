import sinon from 'sinon';
import { onmessage } from '../TextFixed.worker';
import utils from '../../../../utils';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';

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
					words: ['word'],
					numWordsToGenerate: 1
				}
			}
		};

		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('chicken');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 'chicken' });
	});
});
