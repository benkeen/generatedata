// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: 'LatLng',
				title: 'lat',
				settings: {
					lat: true,
					lng: false
				}
			},
			{
				plugin: 'LatLng',
				title: 'lng',
				settings: {
					lat: false,
					lng: true
				}
			},
			{
				plugin: 'LatLng',
				title: 'both-lat-and-lng',
				settings: {
					lat: true,
					lng: true
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
		expect(Object.keys(generatedJSON[0])).toEqual(['email']);
	});
});
