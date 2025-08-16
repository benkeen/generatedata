import { onmessage } from '../Boolean.worker';
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
				rowState: ['Booyah'],
				i18n
			}
		};

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 'Booyah' });
	});
});
