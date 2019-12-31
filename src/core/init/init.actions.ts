import { ThunkDispatch } from 'redux-thunk';
import * as langUtils from '../../utils/langUtils';
import { GDLocale } from '../../../types/general';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale: GDLocale) => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const selectLocale = (locale: GDLocale) => {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        loadLocaleFile(`./${locale}.js`, (locale: GDLocale, strings: any) => {
            langUtils.setLocale(locale, strings);
            dispatch(setLocaleFileLoaded(locale));
        });
    }
};

// kludgy, but simple
export const loadLocaleFile = (src: string, callback: Function) => {
	var s = document.createElement('script');
	s.src = src;
	document.body.appendChild(s);

	var callbackTimer = setInterval(() => {
		if (window.gd && window.gd.locale !== '') {
			clearInterval(callbackTimer);
			callback(window.gd.locale, window.gd.strings);
		}
	}, 100);
};
