import env from '../../_env';
// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever
let currentLocale;
const langStrings = {};
export const setLocale = (locale, localeStrings) => {
    currentLocale = locale;
    langStrings[locale] = localeStrings;
};
export const getLocale = () => currentLocale;
export const getStrings = (locale) => langStrings[locale || currentLocale];
// use this for constructing JSX
export const getI18n = (i18nString, placeholders) => {
    const parts = i18nString.split(/(%\d+)/);
    const parsed = [];
    parts.forEach((part) => {
        if (/%\d+/.test(part)) {
            const index = parseInt(part.replace('%', ''), 10) - 1;
            if (index < placeholders.length) {
                parsed.push(placeholders[index]);
                // if there's no placeholder for this, just add the original value which looked like a placeholder
            }
            else {
                parsed.push(part);
            }
        }
        else {
            parsed.push(part);
        }
    });
    return parsed;
};
// use this getting a string
export const getI18nString = (i18nString, placeholders) => getI18n(i18nString, placeholders).join('');
// looks at the current URL and figures out what locale is being used
export const getCurrentPageLocale = () => {
    const availableLocaleMap = getLocaleMap();
    const path = window.location.pathname.replace(/^\//, '').split('/');
    let locale = 'en';
    if (path.length > 0 && availableLocaleMap[path[0]]) {
        locale = path[0];
    }
    return locale;
};
const localeMap = env.availableLocales.reduce((map, locale) => {
    map[locale] = true;
    return map;
}, {});
// just for O(1) lookup of our list of locale shortcodes
export const getLocaleMap = () => localeMap;
// returns the localized version of the current page. Note: this strips out any query strings right now.
export const getCurrentLocalizedPath = (targetLocale) => {
    const availableLocaleMap = getLocaleMap();
    // first, if the target locale being passed isn't valid, just return the current URL
    const targetLocaleIsValid = !!availableLocaleMap[targetLocale];
    if (!targetLocaleIsValid) {
        return window.location.pathname;
    }
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/').filter((path) => !!path);
    const currentPathHasLocale = !!availableLocaleMap[path[0]];
    if (path.length > 0 && currentPathHasLocale) {
        path.shift();
    }
    let newPath = '';
    if (targetLocale === 'en') {
        newPath = `/${path.join('/')}`;
    }
    else {
        newPath = `/${targetLocale}`;
        if (path.length > 0) {
            newPath += `/${path.join('/')}`;
        }
    }
    return newPath;
};
//# sourceMappingURL=langUtils.js.map