import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';
import { AccountType, SelectedAccountTab } from '~types/account';

export type AccountEditingData = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
};

export type AccountState = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
	dateExpires: string;
	accountType: AccountType;
	profileImage: string | null;
	numRowsGenerated: number;
	configurations: [];
	selectedTab: SelectedAccountTab;
	editingData: AccountEditingData;
};

export const initialState: AccountState = {
	firstName: '',
	lastName: '',
	email: '',
	country: '',
	region: '',
	dateExpires: '',
	accountType: 'user',
	profileImage: null,
	numRowsGenerated: 0,
	configurations: [],
	selectedTab: 'dataSets',
	editingData: {
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		region: ''
	}
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
			const { firstName, lastName, dateExpires, accountType, email, country, region, numRowsGenerated } = action.payload;
			draft.firstName = firstName;
			draft.lastName = lastName;
			draft.email = email;
			draft.country = country;
			draft.region = region;
			draft.dateExpires = dateExpires;
			draft.accountType = accountType;
			draft.numRowsGenerated = numRowsGenerated;
			draft.editingData = {
				firstName,
				lastName,
				email,
				country,
				region
			};
			break;
		}
	}

}, initialState);

export default reducer;
