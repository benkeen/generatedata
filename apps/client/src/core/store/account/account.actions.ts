import { Dispatch } from 'redux';
import { format } from 'date-fns';
import { apolloClient } from '../../apolloClient';
import { AccountEditingData, SaveDataDialogType } from '~store/account/account.reducer';
import { getEditingData, getSelectedAccountsPageTab } from '~store/account/account.selectors';
import { getCurrentDataSetId, getDataSetSavePackage } from '~store/generator/generator.selectors';
import { AccountStatus, SelectedAccountsTab, SelectedAccountTab } from '~types/account';
import { GDAction } from '~types/general';
import { addToast } from '@generatedata/utils/general';
import { getStrings } from '@generatedata/utils/lang';
import * as queries from '~core/queries';
import type { RenameDataSet } from '~core/queries';
import { SET_ONE_TIME_PASSWORD } from '~store/main/main.actions';

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

export const ON_EDIT_YOUR_ACCOUNT = 'ON_EDIT_YOUR_ACCOUNT';
export const onEditYourAccount = (): GDAction => ({
	type: ON_EDIT_YOUR_ACCOUNT
});

export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const YOUR_ACCOUNT_UPDATED = 'YOUR_ACCOUNT_UPDATED';
export const yourAccountUpdated = (): GDAction => ({
	type: YOUR_ACCOUNT_UPDATED
});

// simple garbage collection. If the user happened to be on Edit Account page when navigating away, reset it back
// to the main Accounts page. Otherwise the data may not still be available when navigating back
export const onCleanupAccountsPage =
	(): any =>
		async (dispatch: Dispatch, getState: any): Promise<any> => {
			const tab = getSelectedAccountsPageTab(getState());

			if (tab === SelectedAccountsTab.editAccount) {
				dispatch(onChangeAccountsTab(SelectedAccountsTab.accounts));
			}
		};

export const saveYourAccount =
	(): any =>
		async (dispatch: Dispatch, getState: any): Promise<any> => {
			const i18n = getStrings();

			const { firstName, lastName, email, country, region } = getEditingData(getState());

			await apolloClient.mutate({
				mutation: queries.SAVE_CURRENT_ACCOUNT,
				variables: { firstName, lastName, email, country, region }
			});

			addToast({
				type: 'success',
				message: i18n.core.yourAccountUpdated
			});

			dispatch(yourAccountUpdated());
		};

// for an admin updating an account
export const saveAccount =
	(data: any): any =>
		async (dispatch: Dispatch): Promise<any> => {
			const i18n = getStrings();
			const { accountId, firstName, lastName, email, country, region, disabled, expiryDate } = data;

			const accountStatus = getAccountStatus(disabled, expiryDate);

			let cleanExpiryDate = null;
			if (expiryDate) {
				cleanExpiryDate = expiryDate;
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
				message: i18n.core.userAccountUpdated
			});

			dispatch(onChangeAccountsTab(SelectedAccountsTab.accounts));
		};

export const clearOneTimePassword = (): GDAction => ({
	type: SET_ONE_TIME_PASSWORD,
	payload: {
		password: ''
	}
});

export const savePassword =
	(currentPassword: string, newPassword: string, onSuccess: () => void, onError: () => void): any =>
		async (dispatch: Dispatch): Promise<any> => {
			const i18n = getStrings();

			const response = await apolloClient.mutate({
				mutation: queries.UPDATE_PASSWORD,
				variables: { currentPassword, newPassword }
			});

			if (!response.data.updatePassword.success) {
				onError();
				return;
			}

			dispatch(clearOneTimePassword());

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
export const hideSaveDataSetDialog = (): GDAction => ({
	type: HIDE_SAVE_DATA_SET_DIALOG
});

export const LOAD_DATA_SETS = 'LOAD_DATA_SETS';
export const SET_CURRENT_DATA_SET = 'SET_CURRENT_DATA_SET';

export const saveNewDataSet =
	(dataSetName: string): any =>
		async (dispatch: Dispatch, getState: any): Promise<any> => {
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

export const UPDATE_CURRENT_DATA_SET_LAST_SAVED = 'UPDATE_CURRENT_DATA_SET_LAST_SAVED';
export const updateCurrentDataSetLastSaved = (lastSaved: any): GDAction => ({
	type: UPDATE_CURRENT_DATA_SET_LAST_SAVED,
	payload: {
		lastSaved
	}
});

export const saveCurrentDataSet =
	(successMsg?: string): any =>
		async (dispatch: Dispatch, getState: any): Promise<any> => {
			const i18n = getStrings();

			const successMessage = successMsg || i18n.core.dataSetSaved;
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
				dispatch(updateCurrentDataSetLastSaved(response.data.saveDataSet.savedDate));

				addToast({
					type: 'success',
					message: successMessage
				});
			}
		};

export const UPDATE_CURRENT_DATA_SET_NAME = 'UPDATE_CURRENT_DATA_SET_NAME';
export const renameDataSet =
	(dataSetName: string): any =>
		async (dispatch: Dispatch, getState: any): Promise<any> => {
			const dataSetId = getCurrentDataSetId(getState());

			const { data } = await apolloClient.mutate({
				mutation: queries.RENAME_DATA_SET,
				variables: {
					dataSetId,
					dataSetName
				}
			});

			if ((data as RenameDataSet).renameDataSet.success) {
				dispatch({
					type: UPDATE_CURRENT_DATA_SET_NAME,
					payload: {
						dataSetName
					}
				});
			}
		};

export const createAccount =
	(data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			const i18n = getStrings();
			const { firstName, lastName, email, country, region, disabled, expiry, expiryDate, oneTimePassword } = data;
			const accountStatus = getAccountStatus(disabled, expiryDate);

			const expiryDateValue = expiry && expiry !== 'none' ? expiryDate.toString() : null;
			const response = await apolloClient.mutate({
				mutation: queries.CREATE_USER_ACCOUNT,
				variables: {
					firstName,
					lastName,
					email,
					country,
					region,
					accountStatus,
					oneTimePassword,
					expiryDate: expiryDateValue
				}
			});

			if (response.data.createUserAccount.success) {
				dispatch(onChangeAccountsTab(SelectedAccountsTab.accounts));

				addToast({
					type: 'success',
					message: i18n.core.accountCreatedDesc
				});
			} else {
				addToast({
					type: 'error',
					message: i18n.core.errorCreatingAccount
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
			const now = Number(format(new Date(), 'T'));
			const expiryDateNum = parseInt(expiryDate.toString()); // ensure it's a number

			if (expiryDateNum < now) {
				accountStatus = AccountStatus.expired;
			}
		}
	}
	return accountStatus;
};
