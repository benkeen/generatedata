// import generate, { GDTemplate } from '@generatedata/cli';
//
// describe('CLI data generation', () => {
// 	const getTemplate = (): GDTemplate => ({
// 		generationSettings: {
// 			numResults: 10
// 		},
// 		dataTemplate: [
// 			{
// 				plugin: 'WeightedList',
// 				title: 'list',
// 				settings: {
// 					listType: 'exactly',
// 					allowDuplicates: true,
// 					delimiter: ', ',
// 					values: [
// 						{ value: 1, }
// 					]
// 				}
// 			},
// 		],
// 		exportSettings: {
// 			plugin: 'JSON',
// 			settings: {
// 				dataStructureFormat: 'simple'
// 			}
// 		}
// 	});
//
// 	it('Confirm simple export format', async () => {
// 		const data = await generate(getTemplate());
// 		const generatedJSON = JSON.parse(data);
//
// 		expect(generatedJSON.length).toEqual(10);
// 		expect(Object.keys(generatedJSON[0])).toEqual(['time']);
// 	});
// });
