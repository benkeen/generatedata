import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			// {
			// 	plugin: 'Region',
			// 	title: 'Full Region',
			// 	settings: {
			// 		source: 'anyRegion',
			// 		formats: ['full']
			// 	}
			// },
			// {
			// 	plugin: 'Region',
			// 	title: 'Short Region Code',
			// 	settings: {
			// 		source: 'anyRegion',
			// 		formats: ['short']
			// 	}
			// },
			// {
			// 	plugin: 'Region',
			// 	title: 'Short/Full Region Code',
			// 	settings: {
			// 		source: 'anyRegion',
			// 		formats: ['short', 'full']
			// 	}
			// },
			// {
			// 	plugin: 'Region',
			// 	title: 'Region from 2 countries',
			// 	settings: {
			// 		source: 'countries',
			// 		selectedCountries: ['Canada', 'Russia'],
			// 		formats: ['full']
			// 	}
			// },

			// {
			// 	plugin: 'Country',
			// 	title: 'Country',
			// 	settings: {
			// 		source: 'plugins',
			// 		selectedCountries: []
			// 	},
			// 	id: '1'
			// },
			// {
			// 	plugin: 'Region',
			// 	title: 'Full Region mapped to Country Row #1',
			// 	settings: {
			// 		source: 'countryRow',
			// 		targetRowId: '1',
			// 		formats: ['full']
			// 	}
			// },
			// {
			// 	plugin: 'Region',
			// 	title: 'Short Region mapped to Country Row #1',
			// 	settings: {
			// 		source: 'countryRow',
			// 		targetRowId: '1',
			// 		formats: ['short']
			// 	}
			// },

			{
				plugin: 'Country',
				title: 'country',
				settings: {
					source: 'plugins',
					selectedCountries: ['Canada', 'US']
				},
				id: '2'
			},
			{
				plugin: 'Region',
				title: 'region',
				settings: {
					source: 'countryRow',
					targetRowId: '2',
					formats: ['full']
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

		console.log(data);
		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual([
			'Full Region',
			'Short Region Code',
			'Short/Full Region Code',
			'Region from 2 countries',
			'country-plugin1',
			'Full Region mapped to Country Row #1',
			'Short Region mapped to Country Row #1',
			'country-plugin2',
			'Full Region mapped to Country Subset row'
		]);
	});
});
