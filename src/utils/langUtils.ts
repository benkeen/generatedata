import { GDLocale } from '../../types/general';

// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale: GDLocale = null;
const langStrings: any = {};


export const setLocale = (locale: GDLocale, localeStrings: any) => {
	currentLocale = locale;
	langStrings[locale] = localeStrings;
};

export const getStrings = (locale?: GDLocale) => langStrings[locale || currentLocale];
