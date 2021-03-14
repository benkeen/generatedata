import { SelectedAccountTab, SelectedAccountsTab } from '~types/account';
import { AccountEditingData, SaveDataDialogType } from '~store/account/account.reducer';
import { getEditingData } from '~store/account/account.selectors';
import { getCurrentDataSetId, getDataSetSavePackage } from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { addToast } from '~utils/generalUtils';
import { getStrings } from '~utils/langUtils';
import * as queries from '~core/queries';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = (data: AccountEditingData): GDAction => ({
	type: UPDATE_ACCOUNT,
	payload: {
		...data
	}
});

export const UPDATE_CREATE_ACCOUNT_DATA = '';
export const updateCreateAccountData = (data: AccountEditingData): GDAction => ({
	type: UPDATE_CREATE_ACCOUNT_DATA,
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


export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const CANCEL_CREATE_ACCOUNT_CHANGES = 'CANCEL_CREATE_ACCOUNT_CHANGES';
export const cancelCreateAccountChanges = (): GDAction => ({ type: CANCEL_CREATE_ACCOUNT_CHANGES });

export const ACCOUNT_UPDATED = 'ACCOUNT_UPDATED';
export const accountUpdated = (): GDAction => ({ type: ACCOUNT_UPDATED });

export const saveChanges = (): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const i18n = getStrings();

	const { firstName, lastName, email, country, region } = getEditingData(getState());

	await apolloClient.mutate({
		mutation: queries.SAVE_ACCOUNT,
		variables: { firstName, lastName, email, country, region }
	});

	addToast({
		type: 'success',
		message: i18n.core.accountUpdated
	});

	dispatch(accountUpdated());
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


export const createAccount = (data: AccountEditingData) => async (dispatch: Dispatch): Promise<any> => {
	const i18n = getStrings();

	const response = await apolloClient.mutate({
		mutation: queries.CREATE_ACCOUNT,
		variables: {
			...data
		}
	});

	if (response.data.createAccount.success) {
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
