import sinon from 'sinon';
import utils from '../../../../utils';
import { onmessage } from '../Country.worker';
import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';

const i18n = require('../i18n/en.json');

describe('onmessage', () => {
	afterEach(function () {
		sinon.restore();
	});

	it('generates random data from all sources', () => {
		window.postMessage = jest.fn();
		window.importScripts = jest.fn();
		const payload: any = {
			data: {
				...getBlankDTGeneratorPayload(),
				rowState: {
					source: 'all',
					selectedCountries: []
				},
				i18n
			}
		};

		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('Zimbabwe');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({ display: 'Zimbabwe' });
	});

	it('generates random data from list of plugins', () => {
		window.postMessage = jest.fn();
		window.importScripts = jest.fn();

		const payload: any = {
			data: {
				...getBlankDTGeneratorPayload(),
				rowState: {
					source: 'plugins',
					selectedCountries: ['Canada']
				},
				countryData: {
					Canada: {
						countryName: 'Canada',
						countrySlug: 'CA'
					}
				},
				i18n
			}
		};

		sinon.stub(utils.randomUtils, 'getRandomArrayValue').returns('Canada');

		onmessage(payload);
		expect(postMessage).toHaveBeenCalledWith({
			display: 'Canada',
			countryDataType: 'Canada',
			slug: 'CA'
		});
	});

});
