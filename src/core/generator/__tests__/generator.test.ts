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
