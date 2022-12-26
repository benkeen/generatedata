import { onmessage } from '../List.worker';
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
					listType: 'exactly',
					values: [123],
					exactly: 1,
					atMost: 1
				}
			}
		};

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: '123' });
	});
});
