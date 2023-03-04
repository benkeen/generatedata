// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'City',
				title: 'any-city',
				settings: {
					source: 'any'
				}
			},
			{
				plugin: 'City',
				title: 'city-within-country',
				settings: {
					source: 'countries',
					selectedCountries: ['Australia', 'Canada']
				}
			},
			{
				plugin: 'Region',
				title: 'region-source',
				settings: {
					source: 'countries',
					selectedCountries: ['Germany', 'Australia'],
					formats: ['full']
				},
				id: '1'
			},
			{
				plugin: 'City',
				title: 'city-within-region',
				settings: {
					source: 'regionRow',
					targetRowId: '1'
				}
			}
		],
		exportSettings: {
			plugin: 'JSON',
			settings: {
				dataStructureFormat: 'simple'
			}
		}
	});

	it('Confirm generates correctly', async () => {
		const data = await generate(getTemplate());
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual([
			'any-city',
			'city-within-country',
			'region-source',
			'city-within-region',
		]);
	});
});
