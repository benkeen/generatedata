import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { GET_ACCOUNTS } from '~core/queries';

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';
export const getAccounts = (): any => async (dispatch: Dispatch): Promise<any> => {
	const response = await apolloClient.query({
		query: GET_ACCOUNTS
	});

	dispatch({
		type: ACCOUNTS_LOADED,
		payload: {
			accounts: response.data.accounts
		}
	});
};
