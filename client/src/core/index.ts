/* istanbul ignore file */
import store from './store';
import C from './constants';
import * as actions from './store/generator/generator.actions';
import * as mainActions from './store/main/main.actions';
import * as selectors from './store/generator/generator.selectors';
import * as mainSelectors from './store/main/main.selectors';
import { DataTypeFolder } from '../../_plugins';
import { createDataTypeWorker, createExportTypeWorker } from '~utils/coreUtils';
import { initAuthVendors } from '~utils/authUtils';
import '../../_imports';

export const init = (): void => {

	// create the preview workers. These handle the job of farming out work to the various plugin worker files.
	createDataTypeWorker('preview');
	createExportTypeWorker('preview');

	// initialize any external vendors (Google, Github, Facebook) that are set up for login
	initAuthVendors();

	const state = store.getState();
	const locale = mainSelectors.getLocale(state);
	const exportType = selectors.getExportType(state);
	const numRows = selectors.getNumRows(state);

	store.dispatch(mainActions.selectLocale(locale));
	store.dispatch(actions.onSelectExportType(exportType));

	// if there's a live session, verify the JWT is still valid
	if (mainSelectors.isLoggedIn(state)) {
		store.dispatch(mainActions.refreshToken());
	} else {
		store.dispatch(mainActions.setOnloadAuthDetermined());
	}

	// if there are no rows, load some!
	if (numRows === 0) {
		store.dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));
	}

	const preloadDataTypes = selectors.getRowDataTypes(state);

	preloadDataTypes.forEach((dataType: DataTypeFolder) => actions.loadDataTypeBundle(store.dispatch, store.getState, dataType));
};
