import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './init.actions';
import storage from 'redux-persist/lib/storage';
import { dataTypeNames } from '../../utils/dataTypeUtils';
import { GDLocale } from '../../../types/general';
import { DataTypeFolder } from '../../_plugins';
// import { ExportType } from '../../../types/exportTypes';
// import { CountryType } from '../../../types/countryTypes';

type InitReducer = {
	localeFileLoaded: boolean;
	locale: GDLocale;
	loadedDataTypes: any; 
	// {
	// 	[str in DataTypeFolder]: boolean;
	// },
	// loadedExportTypes: {
	// 	[str in ExportType]: boolean;
	// },
	// loadedCountries: {
	// 	[str in CountryType]: boolean;
	// }
};

const initialState: InitReducer = {
	localeFileLoaded: false,
	locale: 'en',
	loadedDataTypes: dataTypeNames.reduce((acc: any, name: DataTypeFolder) => ({ ...acc, [name]: false }), {}),
	// loadedExportTypes: dataTypeNames.reduce((acc: any, name: ExportType) => acc[name] = false, {}),
	// loadedCountries: dataTypeNames.reduce((acc: any, name: CountryType) => acc[name] = false, {})
};

/**
 * This stores various info about the initialization of the app: locale choice, what plugins have been loaded and anything 
 * high level like that.
 */
export const reducer = (state = initialState, action: AnyAction): InitReducer => {
	switch (action.type) {
		case actions.LOCALE_FILE_LOADED:
			return {
				...state,
				locale: action.payload.locale,
				localeFileLoaded: true
			};
		default:
			return state;
	}
};

const initPersistConfig = {
	key: 'init',
	storage: storage,
	whitelist: ['locale']
};

reducerRegistry.register('init', persistReducer(initPersistConfig, reducer));
