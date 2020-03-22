// @ts-ignore-line
import config from '../../build/config.client';
import store from '../store';
import C from './constants';
import * as initActions from './init/init.actions';
import * as initSelectors from './init/init.selectors';
import * as generatorActions from './generator/generator.actions';
import * as generatorSelectors from './generator/generator.selectors';
import { loadDataTypeBundle } from '../utils/dataTypeUtils';
import { DataTypeFolder } from '../_plugins';

// just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The
// data structure has hardly changed in 15 years and is unlikely to in the future
export const coreConfig = { ...config };

export const init = (): void => {
	const state = store.getState();
	const locale = initSelectors.getLocale(state);
	const numRows = generatorSelectors.getNumRows(state);
	
	store.dispatch(initActions.selectLocale(locale));
	store.dispatch(initActions.selectExportType(config.defaultExportType));

	// if there are no rows, load some
	if (numRows === 0) {
		store.dispatch(generatorActions.addRows(C.NUM_DEFAULT_ROWS));
	}

	const preloadDataTypes = generatorSelectors.getRowDataTypes(state);
	preloadDataTypes.forEach((dataType: DataTypeFolder) => {
		loadDataTypeBundle(dataType).then(() => {
			store.dispatch(initActions.dataTypeLoaded(dataType));
		});
	});
};
