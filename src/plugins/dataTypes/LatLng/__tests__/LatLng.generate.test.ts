import * as latlng from '../LatLng.generate';

// klutzy tests
describe('generation method', () => {

	const defaultSettings = {
		rowNum: 1, 
		existingRowData: [],
		i18n: {}
	};
	
	it('generates a single item when only lat is selected', () => {
		const result = latlng.generate({ 
			...defaultSettings,
    		rowState: { lat: true, lng: false }
		 });
		 expect(result.lat).toBeTruthy();
		 expect(result.lng).toBeFalsy();
		 expect(result.display).toEqual(`${result.lat}`); // yup. It's a string.
	});

	it('generates a single item when only lat is selected', () => {
		const result = latlng.generate({ 
			...defaultSettings,
    		rowState: { lat: false, lng: true }
		 });
		 expect(result.lat).toBeFalsy();
		 expect(result.lng).toBeTruthy();
		 expect(result.display).toEqual(`${result.lng}`);
	});

	it('generates two item when both lat and lng are selected', () => {
		const result = latlng.generate({ 
			...defaultSettings,
    		rowState: { lat: true, lng: true }
		 });
		 expect(result.lat).toBeTruthy();
		 expect(result.lng).toBeTruthy();
		 expect(result.display).toEqual(`${result.lat}, ${result.lng}`);
	});

	it('generates an empty string when neither lat nor lng is selected', () => {
		const result = latlng.generate({ 
			...defaultSettings,
    		rowState: { lat: false, lng: false }
		 });
		 expect(result.lat).toBeFalsy();
		 expect(result.lng).toBeFalsy();
		 expect(result.display).toEqual('');
	});
});
