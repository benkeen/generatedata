import { gql, TypedDocumentNode } from '@apollo/client';

export type RefreshToken = {
	refreshToken: {
		token: string;
		tokenExpiry: number;
		refreshToken: string;
		success: boolean;
		firstName: string;
		lastName: string;
		email: string;
		country: string;
		region: string;
		expiryDate: string;
		accountType: string;
		dateCreated: string;
		numRowsGenerated: number;
		profileImage: string;
	};
};

export const REFRESH_TOKEN: TypedDocumentNode<RefreshToken> = gql`
	mutation RefreshToken {
		refreshToken {
			token
			tokenExpiry
			refreshToken
			success
			firstName
			lastName
			email
			country
			region
			expiryDate
			accountType
			dateCreated
			numRowsGenerated
			profileImage
		}
	}
`;
