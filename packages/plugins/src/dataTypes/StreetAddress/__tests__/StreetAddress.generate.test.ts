import { generate } from '../StreetAddress.generate';
import * as sinon from 'sinon';
import utils from '../../../../utils';
import { DTGenerationData } from '~types/dataTypes';
const i18n = require('../i18n/en.json');

describe('generate', () => {
	let data: DTGenerationData = {
		rowNum: 1,
		rowState: '',
		i18n,
		countryI18n: {},
		existingRowData: [],
		countryData: {},
		template: {}
	};

	afterEach(() => {
		sinon.restore();
	});

	it('street address format 1', () => {
		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('Wilkins');
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('St');
		sinon.stub(utils.randomUtils, 'getRandomNum')
			.onCall(0).returns(1) // format #1
			.onCall(1).returns(555) // PO Box
			.onCall(2).returns(1234); // street name number

		expect(generate(data, utils)).toEqual({
			display: 'P.O. Box 555, 1234 Wilkins St'
		});
	});

	it('street address format 2', () => {
		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('Wilkins');
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('St');
		sinon.stub(utils.randomUtils, 'getRandomNum')
			.onCall(0).returns(2) // format #2
			.onCall(1).returns(555)
			.onCall(2).returns(1234);

		expect(generate(data, utils)).toEqual({
			display: '555-1234 Wilkins St'
		});
	});

	it('street address format 3', () => {
		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('Wilkins');
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('St');
		sinon.stub(utils.randomUtils, 'getRandomNum')
			.onCall(0).returns(3) // format #3
			.onCall(1).returns(555)
			.onCall(2).returns(1234);

		expect(generate(data, utils)).toEqual({
			display: 'Ap #555-1234 Wilkins St'
		});
	});

	it('street address format 4', () => {
		sinon.stub(utils.randomUtils, 'generateRandomTextStr').returns('Wilkins');
		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('St');
		sinon.stub(utils.randomUtils, 'getRandomNum')
			.onCall(0).returns(4) // format #4
			.onCall(1).returns(555)
			.onCall(2).returns(1234);

		expect(generate(data, utils)).toEqual({
			display: '555 Wilkins St'
		});
	});

});
