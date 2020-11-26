import { shouldGeneratePreviewRows } from '../generator.selectors';
import { getTestState } from '../../../../../tests/testHelpers';
import { Store } from '~types/general';

describe("shouldGeneratePreviewRows", () => {
	let state: Store;
	beforeEach(() => {
		state = getTestState();
	});

	it("return false when there's no data type rows", () => {
		state.generator.loadedExportTypes.JSON = true;
		expect(shouldGeneratePreviewRows(state)).toEqual(false);
	});

	it("return false when there is a data type but it's not loaded yet", () => {
		state.generator.loadedExportTypes.JSON = true;
		state.generator.rows = {
			abc: {
				id: 'abc',
				dataType: 'Names',
				title: 'Test',
				data: {}
			}
		};
		state.generator.loadedDataTypes.Names = false;
		expect(shouldGeneratePreviewRows(state)).toEqual(false);
	});

	it("return true when there is a single data type that's been loaded", () => {
		state.generator.loadedExportTypes.JSON = true;
		state.generator.rows = {
			abc: {
				id: 'abc',
				dataType: 'Names',
				title: 'Test',
				data: {}
			}
		};
		state.generator.loadedDataTypes.Names = true;
		expect(shouldGeneratePreviewRows(state)).toEqual(true);
	});

	it("with multiple data types only returns true when they're all loaded", () => {
		state.generator.loadedExportTypes.JSON = true;
		state.generator.rows = {
			abc: {
				id: 'abc',
				dataType: 'Names',
				title: 'Test 1',
				data: {}
			},
			def: {
				id: 'def',
				dataType: 'Phone',
				title: 'Test 2',
				data: {}
			},
			ghi: {
				id: 'ghi',
				dataType: 'City',
				title: 'Test 3',
				data: {}
			}
		};
		state.generator.loadedDataTypes.Names = true;
		expect(shouldGeneratePreviewRows(state)).toEqual(false);

		state.generator.loadedDataTypes.City = true;
		const newState1 = JSON.parse(JSON.stringify(state));
		expect(shouldGeneratePreviewRows(newState1)).toEqual(false);

		newState1.generator.loadedDataTypes.Phone = true;
		const newState2 = JSON.parse(JSON.stringify(newState1));
		expect(shouldGeneratePreviewRows(newState2)).toEqual(true);
	});

	it('should return false when the current export type isn\'t loaded yet', () => {
		state.generator.loadedExportTypes.JSON = false; // just to be explicit
		state.generator.rows = {
			abc: {
				id: 'abc',
				dataType: 'Names',
				title: 'Test',
				data: {}
			}
		};
		state.generator.loadedDataTypes.Names = true;
		expect(shouldGeneratePreviewRows(state)).toEqual(false);
	});

	it('should return false when all row data has already been generated', () => {
		state.generator.loadedExportTypes.JSON = true;
		state.generator.rows = {
			abc: {
				id: 'abc',
				dataType: 'Names',
				title: 'Test',
				data: {}
			}
		};
		state.generator.dataTypePreviewData = {
			abc: 'random data here'
		};
		state.generator.loadedDataTypes.Names = true;
		expect(shouldGeneratePreviewRows(state)).toEqual(false);
	});

});
