import { createStore, combineReducers } from 'redux';
import * as actions from '../generator.actions';
import * as selectors from '../generator.selectors';
import { reducer } from '../generator.reducer';

describe('generator section', () => {
	let store: any;
	beforeEach(() => {
		store = createStore(combineReducers({
			generator: reducer
		}));
	});

	it('the grid panel is visible by default', () => {
		expect(selectors.isGridVisible(store.getState())).toEqual(true);
	});

	it('toggling GRID updates the store', () => {
		store.dispatch(actions.toggleGrid());
		expect(selectors.isGridVisible(store.getState())).toEqual(false);

		store.dispatch(actions.toggleGrid());
		expect(selectors.isGridVisible(store.getState())).toEqual(true);
	});

	it('the preview panel is visible by default', () => {
		expect(selectors.isPreviewVisible(store.getState())).toEqual(true);
	});

	it('toggling PREVIEW updates the store', () => {
		store.dispatch(actions.togglePreview());
		expect(selectors.isPreviewVisible(store.getState())).toEqual(false);

		store.dispatch(actions.togglePreview());
		expect(selectors.isPreviewVisible(store.getState())).toEqual(true);
	});

	it('hiding the grid when preview is closed reopens preview', () => {
		// close the preview panel first
		store.dispatch(actions.togglePreview());
		expect(selectors.isPreviewVisible(store.getState())).toEqual(false);

		// now close the grid
		store.dispatch(actions.toggleGrid());
		expect(selectors.isGridVisible(store.getState())).toEqual(false);

		// now check preview is back open again 
		expect(selectors.isPreviewVisible(store.getState())).toEqual(true);
	});

	it('hiding the preview panel when grid is closed reopens grid', () => {
		// close the grid panel first
		store.dispatch(actions.toggleGrid());
		expect(selectors.isGridVisible(store.getState())).toEqual(false);

		// now close the preview panel
		store.dispatch(actions.togglePreview());
		expect(selectors.isPreviewVisible(store.getState())).toEqual(false);

		// now check grid is back open again 
		expect(selectors.isGridVisible(store.getState())).toEqual(true);
	});

	it('layout is horizontal by default', () => {
		expect(selectors.getBuilderLayout(store.getState())).toEqual('horizontal');
	});

	it('toggling the layout', () => {
		store.dispatch(actions.toggleLayout());
		expect(selectors.getBuilderLayout(store.getState())).toEqual('vertical');

		store.dispatch(actions.toggleLayout());
		expect(selectors.getBuilderLayout(store.getState())).toEqual('horizontal');
	});

	it('sets the default number of rows to 5', () => {
		expect(selectors.getNumPreviewRows(store.getState())).toEqual(5);
	});

	it('updates the number of preview rows', () => {
		store.dispatch(actions.updateNumPreviewRows(10));
		expect(selectors.getNumPreviewRows(store.getState())).toEqual(10);
	});

});

describe('grid rows', () => {
	let store: any;
	beforeEach(() => {
		store = createStore(combineReducers({
			generator: reducer
		}));
	});

	it('adds rows, well, adds rows', () => {
		expect(selectors.getNumRows(store.getState())).toEqual(0);
		store.dispatch(actions.addRows(10));
		expect(selectors.getNumRows(store.getState())).toEqual(10);
	});

	it('added rows get listed as sortable', () => {
		store.dispatch(actions.addRows(5));
		const rows = selectors.getRows(store.getState());
		const rowKeys = Object.keys(rows);
		expect(rowKeys.length).toEqual(5);
		expect(selectors.getSortedRows(store.getState()).length).toEqual(5);
	});

	it('added second batch of rows appends to end', () => {
		store.dispatch(actions.addRows(5));
		store.dispatch(actions.addRows(5));
		
		const rows = selectors.getRows(store.getState());
		const rowKeys = Object.keys(rows);
		expect(rowKeys.length).toEqual(10);
		expect(selectors.getSortedRows(store.getState()).length).toEqual(10);
	});

	it('removing a row removes it from both rows and sorted rows', () => {
		store.dispatch(actions.addRows(5));
		const rows = selectors.getRows(store.getState());
		const rowKeys = Object.keys(rows);
		store.dispatch(actions.removeRow(rowKeys[0]));

		// check the `rows` property is updated
		const updatedRows = selectors.getRows(store.getState());
		const updateRowKeys = Object.keys(updatedRows);
		expect(updateRowKeys.length).toEqual(4);

		// check the `sortedRows` property is also updated
		const sortedRows = selectors.getSortedRows(store.getState());
		expect(sortedRows.length).toEqual(4);
	});

});