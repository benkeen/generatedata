import { ThunkDispatch } from 'redux-thunk';
import * as langUtils from '../../utils/langUtils';
import { GDLocale, GDAction } from '../../../types/general';
import { loadExportTypeBundle } from '../../utils/exportTypeUtils';
import { ExportTypeFolder } from '../../_plugins';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale: GDLocale): GDAction => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const selectLocale = (locale: GDLocale) => {
	return (dispatch: ThunkDispatch<any, any, any>): any => {
		window.gd = {};
		window.gd.localeLoaded = (strings: any): void => {
			langUtils.setLocale(locale, strings);
			dispatch(setLocaleFileLoaded(locale));
		};
		const s = document.createElement('script');
		s.src = `./${locale}.js`;
		document.body.appendChild(s);
	};
};

export const EXPORT_TYPE_LOADED = 'EXPORT_TYPE_LOADED';
export const selectExportType = (exportType: ExportTypeFolder): any => {
	return (dispatch: any): any => {
		loadExportTypeBundle(exportType)
			.then(() => {
				dispatch({
					type: EXPORT_TYPE_LOADED,
					payload: exportType
				});
			});
	};
};
