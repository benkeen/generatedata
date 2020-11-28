import { Dispatch } from 'redux';
import { gql } from '@apollo/client';
import { apolloClient } from '../../apolloClient';

export const getAccount = () => async (dispatch: Dispatch): Promise<any> => {
	// only ever make a request for the account info once (the info isn't persisted in the redux store)

	const response = await apolloClient.query({
		query: gql`
            query AccountQuery {
                account {
					dateExpires,
					accountType,
					firstName,
					lastName,
					email,
					numRowsGenerated
                }
            }
		`
	});

	console.log(response);

	// dispatch()
};
