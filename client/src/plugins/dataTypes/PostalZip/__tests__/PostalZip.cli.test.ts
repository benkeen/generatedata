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

		console.log(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual(['Any postal code']);
	});
});

