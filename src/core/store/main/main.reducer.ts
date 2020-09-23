import { AnyAction } from 'redux';
import produce from 'immer';
import * as actions from './main.actions';
import { GDLocale } from '~types/general';

export type MainState = {
	localeFileLoaded: boolean;
	locale: GDLocale;
	showIntroDialog: boolean;
};

export const defaultState: MainState = {
	localeFileLoaded: false,
	locale: 'en',
	showIntroDialog: true
};

export const reducer = produce((draft: MainState, action: AnyAction) => {
	switch (action.type) {
		case actions.LOCALE_FILE_LOADED:
			draft.locale = action.payload.locale;
			draft.localeFileLoaded = true;
			break;

		case actions.TOGGLE_INTRO_DIALOG:
			draft.showIntroDialog = !draft.showIntroDialog;
			break;
	}
}, defaultState);

export default reducer;
