import { createSelector } from 'reselect';
import * as langUtils from '../../utils/langUtils';

export const getLocale = (state) => state.init.locale;
export const getCoreI18n = createSelector(
	getLocale,
	(locale) => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.core : null;
	}
);

export const localeFileLoaded = (state) => state.init.localeFileLoaded;

export const getDataTypeI18n = createSelector(
	getLocale,
	(locale) => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.dataTypes : null;
	}
);
