// @ts-ignore
import generate, { GDTemplate } from '../../../../../../cli/dist/cli/src';

describe('CLI data generation', () => {
	const getTemplate = (): GDTemplate => ({
		generationSettings: {
			numResults: 10
		},
		dataTemplate: [
			{
				plugin: "AutoIncrement",
				title: "Simple increment",
				settings: {
					incrementStart: 1,
					incrementValue: 1
				}
			},
			{
				plugin: "AutoIncrement",
				title: "Tens with prefix",
				settings: {
					incrementStart: 10,
					incrementValue: 10,
					incrementPlaceholder: "A-{{INCR}}"
				}
			},
			{
				plugin: "AutoIncrement",
				title: "Decrement with suffix",
				settings: {
					incrementStart: 100,
					incrementValue: -5,
					incrementPlaceholder: "{{INCR}}B"
				}
			},
			{
				plugin: "AutoIncrement",
				title: "Incrementing range",
				settings: {
					incrementStart: 10,
					incrementValue: 1,
					incrementPlaceholder: "{{INCR}}-{{INCR*2}}"
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

	it('Confirm simple export format', async () => {
		const data = await generate(getTemplate());
		const generatedJSON = JSON.parse(data);

		expect(generatedJSON.length).toEqual(10);
		expect(Object.keys(generatedJSON[0])).toEqual([
			'Simple increment',
			'Tens with prefix',
			'Decrement with suffix',
			'Incrementing range'
		]);
	});
});
