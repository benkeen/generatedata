import * as langUtils from '../../utils/langUtils';

export const LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';
export const setLocaleFileLoaded = (locale) => ({
	type: LOCALE_FILE_LOADED,
	payload: {
		locale
	}
});

export const SELECT_LOCALE = 'SELECT_LOCALE';
export const selectLocale = (locale) => (dispatch) => {
	loadLocaleFile(`./${locale}.js`, (locale, strings) => {
		langUtils.setLocale(locale, strings);
		dispatch(setLocaleFileLoaded(locale));
	});
};

export const loadLocaleFile = (src, callback) => {
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

