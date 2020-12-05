import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';
import * as actions from './accounts.actions';


export type AccountsState = {
	accounts: any[];
};

export const initialState: AccountsState = {
	accounts: []
};

export const reducer = produce((draft: AccountsState, action: AnyAction) => {
	switch (action.type) {
		case mainActions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		case actions.ACCOUNTS_LOADED:
			console.log("loaded: ", action.payload);
			draft.accounts = action.payload.accounts;
			break;
	}

}, initialState);

export default reducer;
