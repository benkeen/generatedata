import { AuthMethod, GDLocale, Store } from '~types/general';

export const getAppStateVersion = (state: Store): number => state.main.appStateVersion;
export const getAuthMethod = (state: Store): AuthMethod => state.main.authMethod;
export const getLocale = (state: Store): GDLocale => state.main.locale;
export const localeFileLoaded = (state: Store): boolean => state.main.localeFileLoaded;
export const shouldShowIntroDialog = (state: Store): boolean => state.main.showIntroDialog;
export const shouldShowLoginDialog = (state: Store): boolean => state.main.showLoginDialog;
export const isLoggedIn = (state: Store): boolean => state.main.isLoggedIn;
export const isUserTokenVerified = (state: Store): boolean => state.main.userTokenVerified;
