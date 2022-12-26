import { onmessage } from '../Constant.worker';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';

const testLoop = (rowNum: number, loopCount: number, values: any[], expected: any) => {
	window.postMessage = jest.fn();
	window.importScripts = jest.fn();

	const payload: any = {
		data: {
			...getBlankDTGeneratorPayload(),
			rowNum,
			rowState: {
				values,
				loopCount
			}
		}
	};

	onmessage(payload);
	expect(window.postMessage).toHaveBeenCalledWith({ display: expected });
};

describe('onmessage', () => {
	it('generates nothing when there are no values', () => {
		window.postMessage = jest.fn();
		window.importScripts = jest.fn();

		const payload: any = {
			data: {
				...getBlankDTGeneratorPayload(),
				rowState: {
					values: [],
					loopCount: 5
				}
			}
		};

		onmessage(payload);
		expect(window.postMessage).toHaveBeenCalledWith({ display: '' });
	});

	it('generates a single value', () => {
		window.postMessage = jest.fn();
		window.importScripts = jest.fn();

		const payload: any = {
			data: {
				...getBlankDTGeneratorPayload(),
				rowState: {
					values: [4455],
					loopCount: 1
				}
			}
		};

		onmessage(payload);
		expect(window.postMessage).toHaveBeenCalledWith({ display: 4455 });
	});

	it('generates appropriate value with loop count #1', () => {
		testLoop(1, 1, [111, 222, 333], 111);
	});

	it('generates appropriate value with loop count #2', () => {
		testLoop(2, 1, [111, 222, 333], 222);
	});

	it('generates appropriate value with loop count #2', () => {
		testLoop(3, 1, [111, 222, 333], 333);
	});

	it('generates appropriate value with loop count #2', () => {
		testLoop(4, 1, [111, 222, 333], 111);
	});

	it('generates appropriate value with loop count > 1 - #1', () => {
		testLoop(1, 2, [111, 222, 333], 111);
	});

	it('generates appropriate value with loop count > 1 - #2', () => {
		testLoop(2, 2, [111, 222, 333], 111);
	});

	it('generates appropriate value with loop count > 1 - #3', () => {
		testLoop(3, 2, [111, 222, 333], 222);
	});

	it('generates appropriate value with loop count > 1 - #4', () => {
		testLoop(4, 2, [111, 222, 333], 222);
	});
});
