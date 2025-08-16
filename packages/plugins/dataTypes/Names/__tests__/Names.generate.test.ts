import * as sinon from 'sinon';
import { generate } from '../Names.generate';
import utils from '../../../../utils';
import { NamesSource } from '../Names.state';

describe('generate method converts all placeholders', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('generates a single male name', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('Jim');
		expect(generate({
			rowState: {
				options: ['MaleName'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'Jim',
			gender: 'male'
		});
	});

	it('generates a single female name', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('Sue');

		expect(generate({
			rowState: {
				options: ['FemaleName'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'Sue',
			gender: 'female'
		});
	});

	it('generates two male names', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Jim')
			.onCall(1).returns('Bob');

		expect(generate({
			rowState: {
				options: ['MaleName, MaleName'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'Jim, Bob',
			gender: 'male'
		});
	});

	it('generates multiple male names', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Jim')
			.onCall(1).returns('Jimbo')
			.onCall(2).returns('Bob');

		expect(generate({
			rowState: {
				options: ['[MaleName]!!MaleName--MaleName'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: '[Jim]!!Jimbo--Bob',
			gender: 'male'
		});
	});

	it('generates male and female names', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Thomas')
			.onCall(1).returns('Susan');

		expect(generate({
			rowState: {
				options: ['FemaleName,MaleName'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'Susan,Thomas',
			gender: 'unknown'
		});
	});

	it('generates surnames', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue')
			.onCall(0).returns('Whatever');

		expect(generate({
			rowState: {
				options: ['Surname'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'Whatever',
			gender: 'unknown'
		});
	});

	it('generates surnames', () => {
		sinon.stub(utils.randomUtils, 'getRandomCharInString')
			.onCall(0).returns('A');

		expect(generate({
			rowState: {
				options: ['Initial'],
				source: NamesSource.any
			}
		}, utils)).toEqual({
			display: 'A',
			gender: 'unknown'
		});
	});

	it('is backward-compatible for old (pre 4.0.6) saved Names fields that just contains an array of options', () => {
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('Jim');
		expect(generate({
			rowState: ['MaleName']
		}, utils)).toEqual({
			display: 'Jim',
			gender: 'male'
		});
	});
});
