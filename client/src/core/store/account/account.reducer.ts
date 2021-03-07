import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';
import * as actions from '../account/account.actions';
import { AccountType, SelectedAccountTab } from '~types/account';

export type AccountEditingData = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
};

export enum SaveDataDialogType {
	save = 'save',
	saveAs = 'saveAs'
}

export type AccountState = {
	showSaveDataSetDialog: boolean;
	saveDataDialogType: SaveDataDialogType;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
	dateExpires: string;
	accountType: AccountType;
	profileImage: string | null;
	numRowsGenerated: number;
	dataSets: any[];
	selectedTab: SelectedAccountTab;
	editingData: AccountEditingData;
};

export const initialState: AccountState = {
	showSaveDataSetDialog: false,
	saveDataDialogType: SaveDataDialogType.save,
	firstName: '',
	lastName: '',
	email: '',
	country: '',
	region: '',
	dateExpires: '',
	accountType: 'user',
	profileImage: null,
	numRowsGenerated: 0,
	dataSets: [],
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
		case mainActions.LOGOUT:
		case mainActions.RESET_STORE:
			Object.keys(initialState).forEach((key) => {
				// @ts-ignore-line
				draft[key] = initialState[key];
			});
			break;

		case mainActions.SET_AUTHENTICATION_DATA: {
			const { firstName, lastName, dateExpires, accountType, email, country, region, profileImage, numRowsGenerated } = action.payload;
			draft.firstName = firstName;
			draft.lastName = lastName;
			draft.email = email;
			draft.country = country;
			draft.region = region;
			draft.dateExpires = dateExpires;
			draft.accountType = accountType;
			draft.profileImage = profileImage;
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

		case actions.CHANGE_ACCOUNT_TAB:
			draft.selectedTab = action.payload.tab;
			break;

		case actions.UPDATE_ACCOUNT:
			draft.editingData = action.payload;
			break;

		case actions.CANCEL_ACCOUNT_CHANGES:
			draft.editingData = {
				firstName: draft.firstName,
				lastName: draft.lastName,
				email: draft.email,
				country: draft.country,
				region: draft.region
			};
			break;

		case actions.ACCOUNT_UPDATED:
			draft.firstName = draft.editingData.firstName;
			draft.lastName = draft.editingData.lastName;
			draft.email = draft.editingData.email;
			draft.country = draft.editingData.country;
			draft.region = draft.editingData.region;
			break;

		case actions.SHOW_SAVE_DATA_SET_DIALOG:
			draft.showSaveDataSetDialog = true;
			draft.saveDataDialogType = action.payload.dialogType;
			break;

		case actions.HIDE_SAVE_DATA_SET_DIALOG:
			draft.showSaveDataSetDialog = false;
			break;

		case actions.LOAD_DATA_SETS:
			draft.dataSets = action.payload.dataSets;
			break;
	}

}, initialState);

export default reducer;
