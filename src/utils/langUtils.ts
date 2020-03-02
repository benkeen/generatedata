import { GDLocale } from '../../types/general.d';

// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale: GDLocale;
const langStrings: any = {};

export const setLocale = (locale: GDLocale, localeStrings: any): void => {
	currentLocale = locale;
	langStrings[locale] = localeStrings;
};

export const getStrings = (locale?: GDLocale): any => langStrings[locale || currentLocale];
