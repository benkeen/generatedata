import generate, { GDTemplate } from '@generatedata/cli';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Currency',
				title: 'us-dollars',
				settings: {
					from: 1,
					to: 1000000,
					currencySymbol: '$',
					currencySymbolLocation: 'prefix',
					includeCents: true,
					thousandsSeparator: ',',
					centsSeparator: '.'
				}
			},
			{
				plugin: 'Currency',
				title: 'french-canadian',
				settings: {
					from: 1000,
					to: 5000,
					currencySymbol: ' $',
					currencySymbolLocation: 'suffix',
					includeCents: true,
					thousandsSeparator: '.',
					centsSeparator: ','
				}
			},
			{
				plugin: 'Currency',
				title: 'euros-no-cents',
				settings: {
					from: 100000,
					to: 200000,
					currencySymbol: '€',
					currencySymbolLocation: 'prefix',
					includeCents: false,
					thousandsSeparator: ',',
					centsSeparator: ''
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
		expect(Object.keys(generatedJSON[0])).toEqual(['us-dollars', 'french-canadian', 'euros-no-cents']);
	});
});
