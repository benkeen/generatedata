// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale = null;
const langStrings = {};

export const setLocale = (locale, localeStrings) => {
	currentLocale = locale;
	langStrings[locale] = localeStrings;
};

export const getStrings = (locale) => langStrings[locale || currentLocale];
