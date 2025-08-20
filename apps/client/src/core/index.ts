/* istanbul ignore file */
import store from './store';
import C from '@generatedata/config/constants';
import * as actions from './store/generator/generator.actions';
import * as mainActions from './store/main/main.actions';
import * as selectors from './store/generator/generator.selectors';
import * as mainSelectors from './store/main/main.selectors';
import { requestCountryNames } from '~store/generator/generator.actions';
import { DataTypeFolder } from '@generatedata/plugins';
import * as coreUtils from '../utils/coreUtils';
import { initAuthVendors } from '@generatedata/utils/auth';
import { getCurrentPageLocale } from '@generatedata/utils/lang';
import '../../_imports';

export const init = (): void => {
	coreUtils.createGenerationWorker('preview');

	const state = store.getState();
	const pageLocale = getCurrentPageLocale();

	// initialize any external vendors (Google, Github, Facebook) that are set up for login
	initAuthVendors();

	const isLoggedIn = mainSelectors.isLoggedIn(state);
	const exportType = selectors.getExportType(state);
	const numRows = selectors.getNumRows(state);

	store.dispatch(mainActions.selectLocale(pageLocale));
	store.dispatch(actions.onSelectExportType(exportType, { shouldRefreshPreviewPanel: false }));

	const loadCountryNames = selectors.currentDataSetNeedsCountryNames(state);
	if (loadCountryNames) {
		store.dispatch(requestCountryNames());
	}

	// if there's a live session, verify the JWT is still valid
	if (isLoggedIn) {
		store.dispatch(mainActions.updateRefreshToken());
	} else {
		store.dispatch(mainActions.setOnloadAuthDetermined());
	}

	// if there are no rows, load some!
	if (numRows === 0) {
		store.dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));
	}

	const preloadDataTypes = selectors.getRowDataTypes(state);

	preloadDataTypes.forEach((dataType: DataTypeFolder) =>
		actions.loadDataTypeBundle(store.dispatch, store.getState, dataType, {
			shouldRefreshPreviewPanel: false
		})
	);
};
