// import { Dispatch } from 'redux';
// import { gql } from '@apollo/client';
// import { apolloClient } from '../../apolloClient';


// export const UPDATE_ACCOUNT_INFO = 'UPDATE_ACCOUNT_INFO';

// dispatch: Dispatch
import { SelectedAccountTab } from '~types/account';

export const updateAccount = () => async (): Promise<any> => {
	// only ever make a request for the account info once (the info isn't persisted in the redux store)

	/*
	const response = await apolloClient.query({
		mutation: gql`
			mutation UpdateAccount {
				account {
				dateExpires,
				accountType,
				firstName,
				lastName,
				email,
				numRowsGenerated
			}
		`
	});

	// TODO error handling

	dispatch({
	 	type: UPDATE_ACCOUNT_INFO,
	 	payload: response.data.account
	});
	*/
};

export const CHANGE_ACCOUNT_TAB = 'CHANGE_ACCOUNT_TAB';
export const onChangeTab = (tab: SelectedAccountTab) => ({
	type: CHANGE_ACCOUNT_TAB,
	payload: {
		tab
	}
});
