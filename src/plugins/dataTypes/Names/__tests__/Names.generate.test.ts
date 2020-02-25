import { generate } from '../Names.generate';
import * as sinon from 'sinon';
import * as randomUtils from '../../../../utils/randomUtils';
import { DTGenerationData } from '../../../../../types/dataTypes';


describe('generate method converts all placeholders', () => {
	let data: DTGenerationData = {
		rowNum: 1,
		rowState: '',
		i18n: {},
		existingRowData: []
	};

	afterEach(() => {
		sinon.restore();
	});

	it('generates a single male name', () => {
		data.rowState = 'MaleName';
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('Jim');

		expect(generate(data)).toEqual({
			display: 'Jim',
			gender: 'male'
		});
	});

	it('generates a single female name', () => {
		data.rowState = 'FemaleName';
		sinon.stub(randomUtils, 'getRandomArrayValue').returns('Sue');

		expect(generate(data)).toEqual({
			display: 'Sue',
			gender: 'female'
		});
	});

	it('generates two male names', () => {
		data.rowState = 'MaleName, MaleName';
		sinon.stub(randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Jim')
			.onCall(1).returns('Bob');

		expect(generate(data)).toEqual({
			display: 'Jim, Bob',
			gender: 'male'
		});
	});

	it('generates multiple male names', () => {
		data.rowState = '[MaleName]!!MaleName--MaleName';
		sinon.stub(randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Jim')
			.onCall(1).returns('Jimbo')
			.onCall(2).returns('Bob');

		expect(generate(data)).toEqual({
			display: '[Jim]!!Jimbo--Bob',
			gender: 'male'
		});
	});

	it('generates male and female names', () => {
		data.rowState = 'FemaleName,MaleName';
		sinon.stub(randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Thomas')
			.onCall(1).returns('Susan');

		expect(generate(data)).toEqual({
			display: 'Susan,Thomas',
			gender: 'unknown'
		});
	});

	it('generates surnames', () => {
		data.rowState = 'Surname';
		sinon.stub(randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Whatever')

		expect(generate(data)).toEqual({
			display: 'Whatever',
			gender: 'unknown'
		});
	});

	it('generates surnames', () => {
		data.rowState = 'Initial';
		sinon.stub(randomUtils, 'getRandomCharInString')
			.onCall(0).returns('A')

		expect(generate(data)).toEqual({
			display: 'A',
			gender: 'unknown'
		});
	});

});
