import { cleanListWithBackup } from '../URLs';

describe('cleanListWithBackup', () => {
	it('converts list of comma-delimited spaces to an array', () => {
		const items = 'one,two,three';
		expect(cleanListWithBackup(items, '')).toEqual([
			'one',
			'two',
			'three'
		]);
	});

	it('removes whitespace around items', () => {
		const items = 'one, two, three,      four,five';
		expect(cleanListWithBackup(items, '')).toEqual([
			'one',
			'two',
			'three',
			'four',
			'five'
		]);
	});

	it('removes completely empty elements', () => {
		const items = 'one, two, ,          ,,three';
		expect(cleanListWithBackup(items, '')).toEqual([
			'one',
			'two',
			'three',
		]);
	});

	it('if everything is empty, relies on backup string', () => {
		const items = '';
		expect(cleanListWithBackup(items, 'backup,values,here')).toEqual([
			'backup',
			'values',
			'here',
		]);
	});

	it('if everything is empty, relies on backup string #2', () => {
		const items = ', , , , , ,,,,,,,';
		expect(cleanListWithBackup(items, 'backup,values,here')).toEqual([
			'backup',
			'values',
			'here',
		]);
	});

});
