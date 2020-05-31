import { GDLocale, Store } from '../../../../types/general';

export const getLocale = (state: Store): GDLocale => state.main.locale;
export const localeFileLoaded = (state: Store): boolean => state.main.localeFileLoaded;
