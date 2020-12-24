import { getI18nString } from '../langUtils';

describe('getI18nString', () => {
	it('bounds checking', () =>{
		expect(getI18nString('test', [])).toEqual('test');
		expect(getI18nString('test', ['whatever'])).toEqual('test');
		expect(getI18nString('', [])).toEqual('');
	});

	it('replaces as expected', () => {
		expect(getI18nString('Hello %1', ['world'])).toEqual('Hello world');
		expect(getI18nString('Double %1 %1 test', ['tap'])).toEqual('Double tap tap test');
		expect(getI18nString('Nonexistent placeholder %1 test', [])).toEqual('Nonexistent placeholder %1 test');
		expect(getI18nString('Multiple %1 %2', ['placeholder', 'test'])).toEqual('Multiple placeholder test');
	});
});
