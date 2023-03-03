// @ts-ignore
import generate, { DataType, ExportType, GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (dataStructureFormat: 'simple' | 'complex'): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: DataType.Names,
				title: 'First Name',
				settings: {
					options: ['Name']
				}
			},
			{
				plugin: DataType.Names,
				title: 'Last Name',
				settings: {
					options: ['Surname']
				}
			}
		],
		exportSettings: {
			plugin: ExportType.JSON,
			settings: {
				dataStructureFormat
			}
		}
	});

	it('Confirm simple export format', async () => {
		const data: any = await generate(getTemplate('simple'));
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual(['First Name', 'Last Name']);
	});

	it('Confirm simple export format', async () => {
		const data: any = await generate(getTemplate('complex'));
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.cols).toEqual(['First Name', 'Last Name']);
		expect(generatedJSON.data.length).toEqual(10);
		expect(generatedJSON.data[0].length).toEqual(2);
	});

});

