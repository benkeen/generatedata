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

describe('getUniqueString', () => {
	it('returns the original string if the string is not already taken', () => {
		expect(stringUtils.getUniqueString('one', [])).toEqual('one');
		expect(stringUtils.getUniqueString('one', ['two', 'three'])).toEqual('one');
	});
	it('returns the string plus 1 if it is taken', () => {
		expect(stringUtils.getUniqueString('one', ['one'])).toEqual('one1');
		expect(stringUtils.getUniqueString('one', ['one', 'one1'])).toEqual('one2');
		expect(stringUtils.getUniqueString('one', ['one', 'one1', 'one2'])).toEqual('one3');
		expect(stringUtils.getUniqueString('one', ['one1', 'one2'])).toEqual('one');
	});
});

