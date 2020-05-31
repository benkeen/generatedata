import { GDAction, GDLocale } from '../../../../types/general';
import { ThunkDispatch } from 'redux-thunk';
import * as langUtils from '../../../utils/langUtils';

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
