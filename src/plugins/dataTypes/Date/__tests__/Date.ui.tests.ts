import { format } from 'date-fns';
import * as ui from '../Date.ui';

const date = new Date(2020, 0, 3);

describe('getOptions', () => {
    it('confirm that all provided formats generate the expected value', () => {
		const expected: any = {
			'MMM d, y': 'Jan 3, 2020',
			'MMMM do, y': 'January 3rd, 2020',
			'EEE, MMM dd': 'Fri, Jan 03',
			'EEE, MMM do, y': 'Fri, Jan 3rd, 2020',
			'LL.dd.yy': '01.03.20',
			'LL-dd-yy': '01-03-20',
			'LL/dd/yy': '01/03/20',
			// 'LL/dd/y': '03/25/2012',
			// 'dd.LL.yy': '25.03.2020',
			// 'dd-LL-yy': '25-03-06',
			// 'dd/LL/y': '25/03/2012',

			// 'Y-m-d H:i:s': ''
			// 'Unix timestamp', value: 'U' },
			// 'ISO 8601 date', value: 'c' },
			// 'RFC 2822 formatted date', value: 'r' },
			// 'A timezone', value: 'T' },	
		};

		ui.getOptions().forEach(({ value }: any) => {
			if (!expected.hasOwnProperty(value)) {
				console.log('missing: ', value);
			} else {
				console.log('TESTING. ', date, value, expected[value]);
				expect(format(date, value)).toEqual(expected[value]);
			}
		});
	});
});
