import * as stringUtils from '../stringUtils';

describe('uppercaseWords', () => {
	it('uppercases a single word', () => {
		expect(stringUtils.uppercaseWords('one')).toEqual('One');
		expect(stringUtils.uppercaseWords('ONE')).toEqual('One');
	});

	it('uppercases multiple word', () => {
		expect(stringUtils.uppercaseWords('one two')).toEqual('One Two');
		expect(stringUtils.uppercaseWords('ONE TWO')).toEqual('One Two');
		expect(stringUtils.uppercaseWords('ONE-TWO')).toEqual('One-two');
	});
});
