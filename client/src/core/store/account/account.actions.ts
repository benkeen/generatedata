import { SelectedAccountTab } from '~types/account';
import { AccountEditingData } from '~store/account/account.reducer';
import { getEditingData } from '~store/account/account.selectors';
import { GDAction } from '~types/general';
import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { gql } from '@apollo/client';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = (data: AccountEditingData) => ({
	type: UPDATE_ACCOUNT,
	payload: {
		...data
	}
});

export const CHANGE_ACCOUNT_TAB = 'CHANGE_ACCOUNT_TAB';
export const onChangeTab = (tab: SelectedAccountTab) => ({
	type: CHANGE_ACCOUNT_TAB,
	payload: {
		tab
	}
});

export const CANCEL_ACCOUNT_CHANGES = 'CANCEL_ACCOUNT_CHANGES';
export const cancelChanges = (): GDAction => ({ type: CANCEL_ACCOUNT_CHANGES });

export const SAVE_ACCOUNT_CHANGES = 'SAVE_ACCOUNT_CHANGES';
export const saveChanges = (): any => async (dispatch: Dispatch, getState: any) => {
	const { firstName, lastName, email, country, region } = getEditingData(getState());

	const response = await apolloClient.mutate({
		mutation: gql`
            mutation UpdateAccount($firstName: String!, $lastName: String!, $email: String!, $country: String!, $region: String) {
                updateAccount(firstName: $firstName, lastName: $lastName, email: $email, country: $country, region: $region) {
                    success
                }
            }
		`,
		variables: { firstName, lastName, email, country, region }
	});

	console.log(response);

};

export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const savePassword = (password: string): GDAction => ({
	type: SAVE_PASSWORD,
	payload: {
		password
	}
});
