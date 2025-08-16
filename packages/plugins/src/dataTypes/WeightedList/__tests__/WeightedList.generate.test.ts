import utils from '../../../../utils';
import { generate } from '../WeightedList.generate';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';

describe('onmessage', () => {
	it('generates random data', () => {
		const data: any = {
			...getBlankDTGeneratorPayload(),
			rowState: {
				listType: 'exactly',
				values: {
					"123": 1
				},
				exactly: 1,
				atMost: 1,
				allowDuplicates: true
			}
		};

		expect(generate(data, utils)).toEqual({ display: '123' });
	});
});
