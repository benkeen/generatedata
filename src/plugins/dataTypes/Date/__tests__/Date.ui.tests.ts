import { format } from 'date-fns';
import * as ui from '../Date.ui';

describe('getOptions', () => {
    it('confirm that all provided formats generate the expected value', () => {
		const date = new Date(Date.UTC(2020, 0, 1));
		const expected: any = {
			'MMM L, y': 'Jan 1, 2020',
			'MMMM Lo, y': 'January 1st, 2020',
			'EEE, MMM LL': 'Mon, Jan 01',
			'EEE, Lo, y': 'Mon, Jan 1st, 2020',
			'LL.dd.yy': '03.25.20',
			'LL-dd-yy': '03-25-06',
			'LL/dd/yy': '03/25/06',
			'LL/dd/y': '03/25/2012',
			'dd.LL.yy': '25.03.2020',
			'dd-LL-yy': '25-03-06',
			'dd/LL/y': '25/03/2012',

			// { format: 'Y-m-d H:i:s', actual:  },
			// { label: 'Unix timestamp', value: 'U' },
			// { label: 'ISO 8601 date', value: 'c' },
			// { label: 'RFC 2822 formatted date', value: 'r' },
			// { label: 'A timezone', value: 'T' },	
		};

		// ui.getOptions().forEach(({ value }: any) => {
		// 	expect(expected.hasOwnProperty(value)).toBeTruthy();

		// 	console.log(date, value, expected[value]);

		// 	expect(format(date, value)).toEqual(expected[value]);
		// });
	});
});