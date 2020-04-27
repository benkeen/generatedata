// @ts-ignore-line
import config from '../../build/config.client';
import store from '../store';
import C from './constants';
import * as actions from './generator/generator.actions';
import * as selectors from './generator/generator.selectors';
import { loadDataTypeBundle } from '../utils/dataTypeUtils';
import { DataTypeFolder } from '../_plugins';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = (): void => {
	const state = store.getState();
	const locale = selectors.getLocale(state);
	const exportType = selectors.getExportType(state);
	const numRows = selectors.getNumRows(state);

	store.dispatch(actions.selectLocale(locale));
	store.dispatch(actions.onSelectExportType(exportType));

	// if there are no rows, load some
	if (numRows === 0) {
		store.dispatch(actions.addRows(C.NUM_DEFAULT_ROWS));
	}

	const preloadDataTypes = selectors.getRowDataTypes(state);
	preloadDataTypes.forEach((dataType: DataTypeFolder) => {
		loadDataTypeBundle(dataType).then(() => {
			store.dispatch(actions.dataTypeLoaded(dataType));
		});
	});
};
