import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';

export type AccountState = {
	firstName: string;
	lastName: string;
	email: string;
	dateExpires: string;
	accountType: 'user' | 'admin';
	profileImage: string | null;
	numRowsGenerated: number;
	configurations: [];
};

export const initialState: AccountState = {
	firstName: '',
	lastName: '',
	email: '',
	dateExpires: '',
	accountType: 'user',
	profileImage: null,
	numRowsGenerated: 0,
	configurations: []
};

export const reducer = produce((draft: AccountState, action: AnyAction) => {
	switch (action.type) {
		case mainActions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;
		case mainActions.SET_AUTHENTICATION_DATA:
			draft.firstName = action.payload.firstName;
			if (action.payload.profileImage) {
				draft.profileImage = action.payload.profileImage;
			}
			break;

		// TODO maybe RESET
		case mainActions.LOGOUT:
			draft.firstName = '';
			draft.lastName = '';
			draft.profileImage = null;
			draft.numRowsGenerated = 0;
			draft.configurations = [];
			break;
	}

}, initialState);

export default reducer;
