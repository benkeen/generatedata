import { AccountStatus, SelectedAccountsTab, SelectedAccountTab } from '~types/account';
import { AccountEditingData, SaveDataDialogType } from '~store/account/account.reducer';
import { getEditingData } from '~store/account/account.selectors';
import { getCurrentDataSetId, getDataSetSavePackage } from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { addToast } from '~utils/generalUtils';
import { getStrings } from '~utils/langUtils';
import * as queries from '~core/queries';
import { format } from 'date-fns';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = (data: AccountEditingData): GDAction => ({
	type: UPDATE_ACCOUNT,
	payload: {
		...data
	}
});

export const CHANGE_ACCOUNT_TAB = 'CHANGE_ACCOUNT_TAB';
export const onChangeTab = (tab: SelectedAccountTab): GDAction => ({
	type: CHANGE_ACCOUNT_TAB,
	payload: {
		tab
	}
});

export const CHANGE_ACCOUNTS_TAB = 'CHANGE_ACCOUNTS_TAB';
export const onChangeAccountsTab = (tab: SelectedAccountsTab): GDAction => ({
	type: CHANGE_ACCOUNTS_TAB,
	payload: {
		tab
	}
});

export const ON_EDIT_ACCOUNT = 'ON_EDIT_ACCOUNT';
export const editAccount = (accountInfo: any): GDAction => ({
	type: ON_EDIT_ACCOUNT,
	payload: {
		accountInfo
	}
});

export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const YOUR_ACCOUNT_UPDATED = 'YOUR_ACCOUNT_UPDATED';
export const yourAccountUpdated = (): GDAction => ({ type: YOUR_ACCOUNT_UPDATED });

export const saveYourAccount = (): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const i18n = getStrings();

	const { firstName, lastName, email, country, region } = getEditingData(getState());

	await apolloClient.mutate({
		mutation: queries.SAVE_CURRENT_ACCOUNT,
		variables: { firstName, lastName, email, country, region }
	});

	addToast({
		type: 'success',
		message: i18n.core.userAccountUpdated
	});

	dispatch(yourAccountUpdated());
};

// for an admin updating an account
export const saveAccount = (data: any): any => async (dispatch: Dispatch): Promise<any> => {
	const i18n = getStrings();
	const { accountId, firstName, lastName, email, country, region, disabled, expiryDate } = data;
	const accountStatus = getAccountStatus(disabled, expiryDate);

	let cleanExpiryDate = expiryDate;
	if (expiryDate) {
		cleanExpiryDate = parseInt(expiryDate, 10);
	}

	await apolloClient.mutate({
		mutation: queries.SAVE_ACCOUNT,
		variables: {
			accountId,
			accountStatus,
			firstName,
			lastName,
			email,
			country,
			region,
			expiryDate: cleanExpiryDate
		}
	});

	addToast({
		type: 'success',
		message: i18n.core.yourAccountUpdated
	});

	dispatch(onChangeAccountsTab(SelectedAccountsTab.accounts));
};

export const savePassword = (currentPassword: string, newPassword: string, onSuccess: () => void, onError: () => void): any => async (): Promise<any> => {
	const i18n = getStrings();

	const response = await apolloClient.mutate({
		mutation: queries.UPDATE_PASSWORD,
		variables: { currentPassword, newPassword }
	});

	if (!response.data.updatePassword.success) {
		onError();
		return;
	}

	addToast({
		type: 'success',
		message: i18n.core.passwordUpdated
	});
	onSuccess();
};

export const SHOW_SAVE_DATA_SET_DIALOG = 'SHOW_SAVE_DATA_SET_DIALOG';
export const showSaveDataSetDialog = (dialogType: SaveDataDialogType): GDAction => ({
	type: SHOW_SAVE_DATA_SET_DIALOG,
	payload: {
		dialogType
	}
});

export const HIDE_SAVE_DATA_SET_DIALOG = 'HIDE_SAVE_DATA_SET_DIALOG';
export const hideSaveDataSetDialog = (): GDAction => ({ type: HIDE_SAVE_DATA_SET_DIALOG });

export const LOAD_DATA_SETS = 'LOAD_DATA_SETS';
export const SET_CURRENT_DATA_SET = 'SET_CURRENT_DATA_SET';

export const saveNewDataSet = (dataSetName: string): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const i18n = getStrings();
	const data: any = getDataSetSavePackage(getState());

	const response = await apolloClient.mutate({
		mutation: queries.SAVE_NEW_DATA_SET,
		variables: {
			dataSetName,
			content: JSON.stringify(data)
		}
	});

	if (response.data.saveNewDataSet.success) {
		dispatch({
			type: SET_CURRENT_DATA_SET,
			payload: {
				dataSetName,
				dataSetId: parseInt(response.data.saveNewDataSet.dataSetId, 10)
			}
		});

		dispatch(hideSaveDataSetDialog());

		addToast({
			type: 'success',
			message: i18n.core.dataSetSaved
		});
	}

	// TODO error handling
};

export const saveCurrentDataSet = (): any => async(dispatch: Dispatch, getState: any): Promise<any> => {
	const i18n = getStrings();

	const state = getState();
	const data: any = getDataSetSavePackage(state);
	const dataSetId = getCurrentDataSetId(state);

	const response = await apolloClient.mutate({
		mutation: queries.SAVE_CURRENT_DATA_SET,
		variables: {
			dataSetId,
			content: JSON.stringify(data)
		}
	});

	if (response.data.saveDataSet.success) {
		addToast({
			type: 'success',
			message: i18n.core.dataSetSaved
		});
	}
};


export const UPDATE_CURRENT_DATA_SET_NAME = 'UPDATE_CURRENT_DATA_SET_NAME';
export const renameDataSet = (dataSetName: string): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const dataSetId = getCurrentDataSetId(getState());

	const response = await apolloClient.mutate({
		mutation: queries.RENAME_DATA_SET,
		variables: {
			dataSetId,
			dataSetName
		}
	});

	if (response.data.renameDataSet.success) {
		dispatch({
			type: UPDATE_CURRENT_DATA_SET_NAME,
			payload: {
				dataSetName
			}
		});
	}
};


// TODO typings
export const createAccount = (data: any) => async (dispatch: Dispatch): Promise<any> => {
	const i18n = getStrings();
	const { firstName, lastName, email, country, region, disabled, expiry, expiryDate } = data;
	const accountStatus = getAccountStatus(disabled, expiryDate);

	const expiryDateValue = (expiry) ? parseInt(expiryDate, 10) : null;
	const response = await apolloClient.mutate({
		mutation: queries.CREATE_USER_ACCOUNT,
		variables: {
			firstName,
			lastName,
			email,
			country,
			region,
			accountStatus,
			expiryDate: expiryDateValue
		}
	});

	if (response.data.createUserAccount.success) {
		dispatch(onChangeAccountsTab(SelectedAccountsTab.accounts));

		addToast({
			type: 'success',
			message: i18n.core.accountCreated
		});
	} else {
		addToast({
			type: 'error',
			message: 'There was an error creating this account.'
		});
	}
};


export const getAccountStatus = (disabled: boolean, expiryDate: number): AccountStatus => {
	let accountStatus = AccountStatus.live;
	if (disabled) {
		accountStatus = AccountStatus.disabled;
	} else {
		// check the expiry date hasn't already passed
		if (expiryDate) {
			const now = Number(format(new Date(), 't'));
			if (expiryDate < now) {
				accountStatus = AccountStatus.expired;
			}
		}
	}

	return accountStatus;
};
