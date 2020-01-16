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
			'LL/dd/y': '01/03/2020',
			'dd.LL.yy': '03.01.20',
			'dd-LL-yy': '03-01-20',
			'dd/LL/y': '03/01/2020',
			'y-LL-dd HH:mm:ss': '2020-01-03 00:00:00'
		};

		ui.getOptions().forEach(({ value }: any) => {
			if (expected.hasOwnProperty(value)) {
				expect(format(date, value)).toEqual(expected[value]);
			}
		});
	});
});
