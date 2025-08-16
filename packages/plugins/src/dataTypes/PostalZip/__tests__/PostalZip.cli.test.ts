// @ts-ignore
import generate, { DataType, ExportType, GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: DataType.PostalZip,
				title: 'Any postal code',
				settings: {
					source: 'any'
				}
			},
			{
				plugin: DataType.PostalZip,
				title: 'two-countries',
				settings: {
					source: 'countries',
					selectedCountries: ['Canada', 'US']
				}
			},
			{
				plugin: 'Country',
				title: 'country-plugins-subset',
				settings: {
					source: 'plugins',
					selectedCountries: [
						'Canada',
						'US',
						'Norway'
					]
				},
				id: '123'
			},
			{
				plugin: 'PostalZip',
				title: 'zip',
				settings: {
					source: 'countryRow',
					targetRowId: '123'
				}
			},
			{
				plugin: 'Region',
				title: 'Region from 2 countries',
				settings: {
					source: 'countries',
					selectedCountries: ['Canada', 'US'],
					formats: ['full']
				},
				id: '555'
			},
			{
				plugin: 'PostalZip',
				title: 'zip2',
				settings: {
					source: 'regionRow',
					targetRowId: '555'
				}
			}
		],
		exportSettings: {
			plugin: ExportType.JSON,
			settings: {
				dataStructureFormat: 'simple'
			}
		}
	});

	it('Generates as expected', async () => {
		const data: any = await generate(getTemplate());
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual([
			'Any postal code',
			'two-countries',
			'country-plugins-subset',
			'zip',
			'Region from 2 countries',
			'zip2'
		]);
	});
});

