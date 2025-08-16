import { GDLocale } from '@generatedata/types';
import C from '@generatedata/config/constants';

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

// looks at the current URL and figures out what locale is being used
export const getCurrentPageLocale = (): GDLocale => {
  const availableLocaleMap = getLocaleMap();
  const path = window.location.pathname.replace(/^\//, '').split('/');

  let locale = 'en';
  if (path.length > 0 && availableLocaleMap[path[0]]) {
    locale = path[0];
  }

  return locale as GDLocale;
};

const localeMap = Object.keys(C.GD_ALL_SUPPORTED_LOCALES).reduce((map: any, locale) => {
  map[locale] = true;
  return map;
}, {});

// just for O(1) lookup of our list of locale shortcodes
export const getLocaleMap = (): any => localeMap;

// returns the localized version of the current page. Note: this strips out any query strings right now.
export const getCurrentLocalizedPath = (targetLocale: GDLocale): string => {
  const availableLocaleMap = getLocaleMap();

  // first, if the target locale being passed isn't valid, just return the current URL
  const targetLocaleIsValid = !!availableLocaleMap[targetLocale];
  if (!targetLocaleIsValid) {
    return window.location.pathname;
  }

  const path = window.location.pathname
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .split('/')
    .filter((path) => !!path);

  const currentPathHasLocale = !!availableLocaleMap[path[0]];
  if (path.length > 0 && currentPathHasLocale) {
    path.shift();
  }

  let newPath = '';
  if (targetLocale === 'en') {
    newPath = `/${path.join('/')}`;
  } else {
    newPath = `/${targetLocale}`;
    if (path.length > 0) {
      newPath += `/${path.join('/')}`;
    }
  }

  return newPath;
};
