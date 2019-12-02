// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale = null;
let langStrings = {};

export const setLocale = (locale, localeStrings) => {
	currentLocale = locale;
	langStrings[locale] = localeStrings;
};

export const getStrings = () => langStrings[currentLocale];
