import { generate } from '../Names.generate';
import * as sinon from 'sinon';
import * as data from '../Names.data';
import { GenerationData } from '../../../../../types/dataTypes';


describe('generate method converts all placeholders', () => {
	beforeEach(() => {
		sinon.stub(data, 'maleNames').returns(['Jim', 'Thomas']);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('generates a single male name', () => {
		const data: GenerationData = {
			rowNum: 1,
			rowState: 'MaleName',
			i18n: {},
			existingRowData: []
		};
		expect(generate(data)).toEqual({
			display: 'Jim',
			gender: 'male'
		});
	});
});
