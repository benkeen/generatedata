// import { onmessage } from '../City.generator';
// import { getBlankDTGeneratorPayload } from '../../../../../tests/testHelpers';
// const i18n = require('../i18n/en.json');
//
// describe('onmessage', () => {
// 	const postMessage = jest.fn();
// 	const importScripts = jest.fn();
// 	beforeAll(() => {
// 		window.postMessage = postMessage;
// 		window.importScripts = importScripts;
// 	});
//
// 	it('generates random data for region row', () => {
// 		const payload: any = {
// 			data: {
// 				...getBlankDTGeneratorPayload(),
// 				rowState: {
// 					source: 'regionRow',
// 					selectedCountries: [],
// 					targetRowId: '123456'
// 				},
// 				existingRowData: [
// 					{
// 						id: '123456',
// 						data: {
// 							countryDataType: 'Australia',
// 							display: 'Australia'
// 						}
// 					}
// 				],
// 				countryData: {
// 					Australia: {
//
// 					}
// 				},
// 				i18n
// 			}
// 		};
//
// 		onmessage(payload);
// 		expect(postMessage).toHaveBeenCalledWith({ display: 1 });
// 	});
// });
