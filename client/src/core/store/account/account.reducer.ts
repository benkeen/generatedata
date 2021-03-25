import { AnyAction } from 'redux';
import produce from 'immer';
import * as mainActions from '../main/main.actions';
import * as actions from '../account/account.actions';
import { AccountType, SelectedAccountTab, SelectedAccountsTab, AccountStatus } from '~types/account';

// use for Edit Account, Your Account
export type AccountEditingData = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
	disabled?: boolean;
	accountId?: number;
	status?: AccountStatus;
	expiryDate?: number;
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
	expiryDate: string;
	accountType: AccountType;
	profileImage: string | null;
	numRowsGenerated: number;
	dataSets: any[];
	selectedTab: SelectedAccountTab;
	selectedAccountsTab: SelectedAccountsTab;
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
	expiryDate: '',
	accountType: 'user',
	profileImage: null,
	numRowsGenerated: 0,
	dataSets: [],
	selectedTab: 'dataSets',
	selectedAccountsTab: SelectedAccountsTab.accounts,

	editingData: {
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		region: '',
		disabled: undefined,
		accountId: undefined,
		status: undefined,
		expiryDate: undefined
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
			const { accountId, firstName, lastName, expiryDate, accountType, email, country, region, profileImage,
				numRowsGenerated } = action.payload;
			draft.firstName = firstName;
			draft.lastName = lastName;
			draft.email = email;
			draft.country = country;
			draft.region = region;
			draft.expiryDate = expiryDate;
			draft.accountType = accountType;
			draft.profileImage = profileImage;
			draft.numRowsGenerated = numRowsGenerated;

			console.log(action.payload);

			// disabled?: boolean;
			// status?: AccountStatus;

			draft.editingData = {
				firstName,
				lastName,
				email,
				country,
				region,
				expiryDate,
				accountId
			};
			break;
		}

		case actions.CHANGE_ACCOUNT_TAB:
			draft.selectedTab = action.payload.tab;
			break;

		case actions.CHANGE_ACCOUNTS_TAB:
			draft.selectedAccountsTab = action.payload.tab;
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

		case actions.ON_EDIT_ACCOUNT:
			const { accountId, firstName, lastName, email, country, region, expiryDate } = action.payload.accountInfo;

			console.log(action.payload.accountInfo);

			draft.selectedAccountsTab = SelectedAccountsTab.editAccount;
			draft.editingData = {
				accountId,
				firstName,
				lastName,
				email,
				country,
				region,
				expiryDate
			};

			// status?: AccountStatus;
			break;
	}

}, initialState);

export default reducer;


