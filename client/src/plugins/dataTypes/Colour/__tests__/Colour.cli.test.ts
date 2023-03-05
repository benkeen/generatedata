// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Colour',
				title: 'colour',
				settings: {
					value: '',
					format: 'hex'
				}
			},
			{
				plugin: 'Colour',
				title: 'bright-red',
				settings: {
					value: '#EE4B2B',
					format: 'hex',
					luminosity: 'bright'
				}
			},
			{
				plugin: 'Colour',
				title: 'green-with-alpha',
				settings: {
					value: 'green',
					format: 'rgba',
					alpha: 0.5
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
			'colour',
			'bright-red',
			'green-with-alpha'
		]);
	});
});
