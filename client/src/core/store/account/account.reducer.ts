import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';
// import * as actions from './account.actions';
import { AccountType } from '~types/account';

export type SelectedAccountTab = 'dataSet' | 'profile' | 'payments';

export type AccountState = {
	firstName: string;
	lastName: string;
	email: string;
	dateExpires: string;
	accountType: AccountType;
	profileImage: string | null;
	numRowsGenerated: number;
	configurations: [];
	selectedTab: SelectedAccountTab;
};

export const initialState: AccountState = {
	firstName: '',
	lastName: '',
	email: '',
	dateExpires: '',
	accountType: 'user',
	profileImage: null,
	numRowsGenerated: 0,
	configurations: [],
	selectedTab: 'dataSet'
};

export const reducer = produce((draft: AccountState, action: AnyAction) => {
	switch (action.type) {
		case mainActions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		// TODO maybe RESET
		case mainActions.LOGOUT:
			draft.firstName = '';
			draft.lastName = '';
			draft.profileImage = null;
			draft.numRowsGenerated = 0;
			draft.configurations = [];
			break;

		case mainActions.SET_AUTHENTICATION_DATA: {
			const { firstName, lastName, dateExpires, accountType, email, numRowsGenerated } = action.payload;
			draft.firstName = firstName;
			draft.lastName = lastName;
			draft.dateExpires = dateExpires;
			draft.accountType = accountType;
			draft.email = email;
			draft.numRowsGenerated = numRowsGenerated;
			break;
		}
	}

}, initialState);

export default reducer;
