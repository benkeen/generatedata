import sinon from 'sinon';
import { onmessage } from '../TextRandom.worker';
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
					numWordsToGenerate: 1,
					fromStart: 1,
					minWords: 1,
					maxWords: 1,
					words: ['word']
				}
			}
		};

		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('testXXX');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 'testXXX' });
	});
});
