// @ts-ignore-line
import config from '../../dist/config.client';
import store from './store';
import C from './constants';
import * as actions from './store/generator/generator.actions';
import * as mainActions from './store/main/main.actions';
import * as selectors from './store/generator/generator.selectors';
import * as mainSelectors from './store/main/main.selectors';
import { DataTypeFolder } from '../_plugins';
import { loadCoreWorker } from '~utils/coreUtils';
import '../_imports';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = (): void => {
	loadCoreWorker();

	const state = store.getState();
	const locale = mainSelectors.getLocale(state);
	const exportType = selectors.getExportType(state);
	const numRows = selectors.getNumRows(state);

	store.dispatch(mainActions.selectLocale(locale));
	store.dispatch(actions.onSelectExportType(exportType));

	// if there are no rows, load some
	if (numRows === 0) {
		store.dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));
	}

	const preloadDataTypes = selectors.getRowDataTypes(state);

	preloadDataTypes.forEach((dataType: DataTypeFolder) => actions.loadDataTypeBundle(store.dispatch, store.getState, dataType));
};
