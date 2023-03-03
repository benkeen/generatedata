// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Alphanumeric',
				title: 'Zip',
				settings: {
					value: 'Xxxxx'
				}
			},
		],
		exportSettings: {
			plugin: 'JSON',
			settings: {
				dataStructureFormat: 'simple'
			}
		}
	});

	it('Confirm simple export format', async () => {
		const data = await generate(getTemplate());
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual(['Zip']);
	});
});
