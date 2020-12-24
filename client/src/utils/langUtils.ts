import { GDLocale } from '~types/general';

// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale: GDLocale;
const langStrings: any = {};

export const setLocale = (locale: GDLocale, localeStrings: any): void => {
	currentLocale = locale;
	langStrings[locale] = localeStrings;
};

export const getLocale = (): GDLocale => currentLocale;

export const getStrings = (locale?: GDLocale): any => langStrings[locale || currentLocale];

// use this for constructing JSX
export const getI18n = (i18nString: string, placeholders: any[]): any => {
	const parts = i18nString.split(/(%\d+)/);
	const parsed: any = [];

	parts.forEach((part) => {
		if (/%\d+/.test(part)) {
			const index = parseInt(part.replace('%', ''), 10) - 1;

			if (index < placeholders.length) {
				parsed.push(placeholders[index]);

				// if there's no placeholder for this, just add the original value which looked like a placeholder
			} else {
				parsed.push(part);
			}
		} else {
			parsed.push(part);
		}
	});

	return parsed;
};

// use this getting a string
export const getI18nString = (i18nString: string, placeholders: any[]): string => getI18n(i18nString, placeholders).join('');
