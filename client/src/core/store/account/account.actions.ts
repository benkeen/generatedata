import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';
import { getEditingData } from '~store/account/account.selectors';
import { getDataSetSavePackage, getCurrentDataSetId } from '~store/generator/generator.selectors';
import { GDAction } from '~types/general';
import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { addToast } from '~utils/generalUtils';
import { getStrings } from '~utils/langUtils';
import { gql } from '@apollo/client';
import { GET_DATA_SETS } from '~core/queries';

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
		mutation: gql`
            mutation UpdateAccount($firstName: String!, $lastName: String!, $email: String!, $country: String!, $region: String) {
                updateAccount(firstName: $firstName, lastName: $lastName, email: $email, country: $country, region: $region) {
                    success
                }
            }
		`,
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
		mutation: gql`
            mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
                updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
                    success
					error
                }
            }
		`,
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
export const getDataSets = (onComplete?: Function): any => async (dispatch: Dispatch): Promise<any> => {
	const response = await apolloClient.query({
		query: GET_DATA_SETS
	});

	console.log("2", response.data.datasets);

	dispatch({
		type: LOAD_DATA_SETS,
		payload: {
			dataSets: [...response.data.datasets]
		}
	});
};

export const SET_CURRENT_DATA_SET = 'SET_CURRENT_DATA_SET';
export const saveNewDataSet = (dataSetName: string): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const i18n = getStrings();
	const data: any = getDataSetSavePackage(getState());

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation SaveNewDataSet($dataSetName: String!, $content: String!) {
                saveNewDataSet(dataSetName: $dataSetName, content: $content) {
                    success
                    error
					dataSetId
                }
            }
		`,
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
		mutation: gql`
            mutation SaveDataSet($dataSetId: ID!, $content: String!) {
                saveDataSet(dataSetId: $dataSetId, content: $content) {
                    success
                    error
                    dataSetId
                }
            }
		`,
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

// export const deleteDataSet = (dataSetId: number): any => async (dispatch: Dispatch): Promise<any> => {
// 	const response = await apolloClient.mutate({
// 		mutation: DELETE_DATA_SET,
// 		variables: {
// 			dataSetId
// 		}
// 	});
//
// 	if (response.data.deleteDataSet.success) {
// 		await dispatch(getDataSets());
//
// 		addToast({
// 			type: 'success',
// 			message: 'The data set has been deleted.'
// 		});
// 	}
// };
