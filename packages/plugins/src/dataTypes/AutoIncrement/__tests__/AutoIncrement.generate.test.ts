import { onmessage } from '../AutoIncrement.worker';
import { initialState } from '../AutoIncrement.state';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';
const i18n = require('../i18n/en.json');

describe('onmessage', () => {
	const postMessage = jest.fn();
	const importScripts = jest.fn();
	beforeAll(() => {
		window.postMessage = postMessage;
		window.importScripts = importScripts;
	});

	const rowState = {
		incrementStart: parseInt(initialState.incrementStart, 10),
		incrementValue: parseInt(initialState.incrementValue, 10),
		incrementPlaceholder: initialState.incrementPlaceholder
	};

	it('generates random data', () => {
		const payload: any = {
			data: {
				...getBlankDTGeneratorPayload(),
				rowState,
				i18n
			}
		};

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 1 });
	});
});
