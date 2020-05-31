import { Store } from '../../../../types/general';

export const getLocale = (state: Store) => state.main.locale;
export const localeFileLoaded = (state: Store) => state.main.localeFileLoaded;
export const shouldShowIntroDialog = (state: Store) => state.main.showIntroDialog;
