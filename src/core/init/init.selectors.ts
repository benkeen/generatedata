import { createSelector } from 'reselect';
import * as langUtils from '../../utils/langUtils';
import { GDLocale } from '../../../types/general';

export const getLocale = (state: any): GDLocale => state.init.locale;
export const getCoreI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.core : null;
	}
);

export const localeFileLoaded = (state: any): boolean => state.init.localeFileLoaded;

export const getDataTypeI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.dataTypes : null;
	}
);
