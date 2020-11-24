import { getNumericFieldColumnIndexes } from '../SQL.generator';

describe('getNumericFieldColumnIndexes', () => {

	it('returns nothing when there are no numeric fields', () => {
		expect(getNumericFieldColumnIndexes([])).toEqual([]);
		expect(getNumericFieldColumnIndexes([
			{ title: 'Col 1', metadata: {}, dataType: 'Names' }
		])).toEqual([]);

		expect(getNumericFieldColumnIndexes([
			{ title: 'Col 1', metadata: { general: { dataType: 'string' } }, dataType: 'Names' },
			{ title: 'Col 1', metadata: { general: { dataType: 'string' } }, dataType: 'Phone' },
		])).toEqual([]);
	});

	it('identifies numeric fields', () => {
		expect(getNumericFieldColumnIndexes([
			{ title: 'Col 1', metadata: { general: { dataType: 'number' } }, dataType: 'Names' },
			{ title: 'Col 1', metadata: { general: { dataType: 'string' } }, dataType: 'Phone' },
			{ title: 'Col 1', metadata: { general: { dataType: 'string' } }, dataType: 'Phone' },
			{ title: 'Col 1', metadata: { general: { dataType: 'number' } }, dataType: 'List' },
			{ title: 'Col 1', metadata: { general: { dataType: 'infer' } }, dataType: 'Phone' },
		])).toEqual([0, 3]);
	});

});
