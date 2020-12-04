import { Dispatch } from 'redux';
import { apolloClient } from '../../apolloClient';
import { gql } from '@apollo/client';

export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';
export const getAccounts = (): any => async (dispatch: Dispatch): Promise<any> => {
	const response = await apolloClient.query({
		query: gql`
            query GetAccounts {
                accounts {
					accountId
					firstName
                    lastName
					dateCreated
					numRowsGenerated
				}
            }
		`
	});

	dispatch({
		type: ACCOUNTS_LOADED,
		payload: {
			dataSets: response.data.accounts
		}
	});
};

