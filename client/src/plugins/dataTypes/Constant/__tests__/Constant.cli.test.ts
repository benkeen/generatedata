// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Constant',
				title: 'ones-and-twos',
				settings: {
					loopCount: 1,
					values: ["One", "Two"]
				}
			},
			{
				plugin: 'Constant',
				title: 'ABCs',
				settings: {
					loopCount: 2,
					values: ["A", "B", "C"]
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
			'ones-and-twos',
			'ABCs'
		]);
	});
});
