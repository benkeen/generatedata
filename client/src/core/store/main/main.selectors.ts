import { AuthMethod, GDLocale, Store } from '~types/general';

export const getAppStateVersion = (state: Store): number => state.main.appStateVersion;
export const getAuthMethod = (state: Store): AuthMethod => state.main.authMethod;
export const getLocale = (state: Store): GDLocale => state.main.locale;
export const localeFileLoaded = (state: Store): boolean => state.main.localeFileLoaded;
export const shouldShowLoginDialog = (state: Store): boolean => state.main.showLoginDialog;
export const shouldShowPasswordResetDialog = (state: Store): boolean => state.main.showPasswordResetDialog;
export const isLoggedIn = (state: Store): boolean => state.main.isLoggedIn;
export const isOnloadAuthDetermined = (state: Store): boolean => state.main.isOnloadAuthDetermined;
export const isLoggingIn = (state: Store): boolean => state.main.isLoggingIn;
export const getAuthToken = (state: Store): string => state.main.authToken;
export const getCurrentPage = (state: Store): string => state.main.currentPage;
export const tourIntroDialogVisible = (state: Store): boolean => state.main.tourIntroDialogVisible;
export const isTourBundleLoaded = (state: Store): boolean => state.main.tourBundleLoaded;
