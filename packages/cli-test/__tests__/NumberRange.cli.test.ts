import generate, { GDTemplate } from '@generatedata/cli';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'NumberRange',
				title: 'num1',
				settings: {
					min: 1,
					max: 100
				}
			},
			{
				plugin: 'NumberRange',
				title: 'num2',
				settings: {
					min: -10000,
					max: -20000
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
		expect(Object.keys(generatedJSON[0])).toEqual(['num1', 'num2']);
	});
});
