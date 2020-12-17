import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';
import { getEditingData } from '~store/account/account.selectors';
import { getDataSetSavePackage, getCurrentDataSetId } from '~store/generator/generator.selectors';
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

export const CHANGE_ACCOUNT_TAB = 'CHANGE_ACCOUNT_TAB';
export const onChangeTab = (tab: SelectedAccountTab): GDAction => ({
	type: CHANGE_ACCOUNT_TAB,
	payload: {
		tab
	}
});

export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const ACCOUNT_UPDATED = 'ACCOUNT_UPDATED';
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

	dispatch({ type: ACCOUNT_UPDATED });
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
export const showSaveDataSetDialog = (): GDAction => ({ type: SHOW_SAVE_DATA_SET_DIALOG });

export const HIDE_SAVE_DATA_SET_DIALOG = 'HIDE_SAVE_DATA_SET_DIALOG';
export const hideSaveDataSetDialog = (): GDAction => ({ type: HIDE_SAVE_DATA_SET_DIALOG });

export const LOAD_DATA_SETS = 'LOAD_DATA_SETS';

// onComplete?: Function
// export const getDataSets = (): any => async (dispatch: Dispatch): Promise<any> => {
// 	const response = await apolloClient.query({
// 		query: queries.GET_DATA_SETS
// 	});
//
// 	dispatch({
// 		type: LOAD_DATA_SETS,
// 		payload: {
// 			dataSets: [...response.data.dataSets]
// 		}
// 	});
// };

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
