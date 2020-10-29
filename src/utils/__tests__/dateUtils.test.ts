import { formatDuration } from '../dateUtils';

describe('formatDuration', () => {
	it('displays < 60 seconds as seconds only', () => {
		expect(formatDuration(10)).toEqual('0:10');
		expect(formatDuration(20)).toEqual('0:20');
		expect(formatDuration(1)).toEqual('0:01');
		expect(formatDuration(59)).toEqual('0:59');
	});

	it('displays < 60 minutes as minutes & seconds', () => {
		expect(formatDuration(60)).toEqual('1:00');
		expect(formatDuration(61)).toEqual('1:01');
		expect(formatDuration(90)).toEqual('1:30');
		expect(formatDuration(120)).toEqual('2:00');
		expect(formatDuration(1000)).toEqual('16:40');
	});
});
