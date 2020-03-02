import { createSelector } from 'reselect';
import * as langUtils from '../../utils/langUtils';
import { GDLocale, Store } from '../../../types/general';

export const getLocale = (state: Store): GDLocale => state.init.locale;
export const getCoreI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.core : null;
	}
);

export const localeFileLoaded = (state: Store): boolean => state.init.localeFileLoaded;

export const getDataTypeI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.dataTypes : null;
	}
);

export const getLoadedDataTypes = (state: Store): any => state.init.loadedDataTypes;
export const getLoadedExportTypes = (state: Store): any => state.init.loadedExportTypes;
