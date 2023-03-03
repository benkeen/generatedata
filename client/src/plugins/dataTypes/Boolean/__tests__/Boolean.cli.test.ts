// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'Boolean',
				title: 'boolean1',
				settings: {
					values: ['Yes', 'No']
				}
			},
			{
				plugin: "Boolean",
				title: "boolean2",
				settings: {
					values: ['0', '1']
				}
			},
			{
				plugin: "Boolean",
				title: "boolean3",
				settings: {
					values: ['true', 'false']
				}
			},
			{
				plugin: 'Boolean',
				title: 'notReallyABoolean',
				settings: {
					values: ['Yes', 'No', 'Maybe']
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
			'boolean1',
			'boolean2',
			'boolean3',
			'notReallyABoolean'
		]);
	});
});
