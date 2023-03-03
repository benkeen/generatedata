// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Country',
				title: 'any-country',
				settings: {
					source: 'all'
				}
			},
			{
				plugin: 'Country',
				title: 'country-plugin',
				settings: {
					source: 'plugins',
					selectedCountries: []
				}
			},
			{
				plugin: 'Country',
				title: 'country-plugins-subset',
				settings: {
					source: 'plugins',
					selectedCountries: [
						'Canada',
						'Nigeria',
						'Spain',
						'Norway'
					]
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
			'any-country',
			'country-plugin',
			'country-plugins-subset'
		]);
	});
});
