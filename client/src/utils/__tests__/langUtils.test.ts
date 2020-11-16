import { parseI18n } from '../langUtils';

describe('parseI18n', () => {
	it('bounds checking', () =>{
		expect(parseI18n('test', [])).toEqual('test');
		expect(parseI18n('test', ['whatever'])).toEqual('test');
		expect(parseI18n('', [])).toEqual('');
	});

	it('replaces as expected', () => {
		expect(parseI18n('Hello %1', ['world'])).toEqual('Hello world');
		expect(parseI18n('Double %1 %1 test', ['tap'])).toEqual('Double tap tap test');
		expect(parseI18n('Nonexistent placeholder %1 test', [])).toEqual('Nonexistent placeholder %1 test');
		expect(parseI18n('Multiple %1 %2', ['placeholder', 'test'])).toEqual('Multiple placeholder test');
	});
});
