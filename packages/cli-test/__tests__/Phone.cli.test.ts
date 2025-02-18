import generate, { GDTemplate } from '@generatedata/cli';

describe('CLI data generation', () => {
	const getTemplate = (dataStructureFormat: 'simple' | 'complex'): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: DataType.Phone,
				title: 'phoneNum1',
				settings: {
					option: ['(Xxx) Xxx-xxxx']
				}
			},
			{
				plugin: 'Phone',
				title: 'phoneNum2',
				settings: {
					option: ['(Xxx) Xxx-xxxx', '1 (Xxx) Xxx-xxxx', 'Xxx Xxx-xxxx']
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
		expect(Object.keys(generatedJSON[0])).toEqual(['phoneNum1', 'phoneNum2']);
	});
});
