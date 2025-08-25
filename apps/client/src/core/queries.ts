import { gql, TypedDocumentNode } from '@apollo/client';

type GetAccounts = {
	accounts: {
		totalCount: number;
		results: {
			accountId: number;
			accountType: string;
			accountStatus: string;
			firstName: string;
			lastName: string;
			email: string;
			country: string;
			region: string;
			dateCreated: string;
			expiryDate: string;
			lastLoggedIn: string;
			numRowsGenerated: number;
		}[];
	};
};

export const GET_ACCOUNTS: TypedDocumentNode<GetAccounts> = gql`
	query GetAccounts($limit: Int, $offset: Int, $sortCol: String, $sortDir: SortDir, $filterStr: String, $status: String) {
		accounts(limit: $limit, offset: $offset, sortCol: $sortCol, sortDir: $sortDir, filterStr: $filterStr, status: $status) {
			totalCount
			results {
				accountId
				accountType
				accountStatus
				firstName
				lastName
				email
				country
				region
				dateCreated
				expiryDate
				lastLoggedIn
				numRowsGenerated
			}
		}
	}
`;

type DeleteAccount = {
	deleteAccount: {
		success: boolean;
		error: string;
	};
};
export const DELETE_ACCOUNT: TypedDocumentNode<DeleteAccount> = gql`
	mutation DeleteAccount($accountId: ID!) {
		deleteAccount(accountId: $accountId) {
			success
			error
		}
	}
`;

export const GET_DATA_SETS = gql`
	query GetDataSets($limit: Int, $offset: Int, $sortCol: String, $sortDir: SortDir) {
		dataSets(limit: $limit, offset: $offset, sortCol: $sortCol, sortDir: $sortDir) {
			totalCount
			results {
				dataSetId
				dataSetName
				status
				dateCreated
				content
				numRowsGenerated
				historyDateCreatedUnix
			}
		}
	}
`;

type GetDataSetHistory = {
	dataSetHistory: {
		totalCount: number;
		results: {
			historyId: number;
			dateCreated: string;
			content: any;
		}[];
	};
};
export const GET_DATA_SET_HISTORY: TypedDocumentNode<GetDataSetHistory> = gql`
	query GetDataSetHistory($dataSetId: ID!, $limit: Int, $offset: Int) {
		dataSetHistory(dataSetId: $dataSetId, limit: $limit, offset: $offset) {
			totalCount
			results {
				historyId
				dateCreated
				content
			}
		}
	}
`;

export const DELETE_DATA_SET = gql`
	mutation DeleteDataSet($dataSetId: ID!) {
		deleteDataSet(dataSetId: $dataSetId) {
			success
			error
		}
	}
`;

export const SAVE_NEW_DATA_SET = gql`
	mutation SaveNewDataSet($dataSetName: String!, $content: String!) {
		saveNewDataSet(dataSetName: $dataSetName, content: $content) {
			success
			error
			dataSetId
			savedDate
		}
	}
`;

type RenameDataSet = {
	renameDataSet: {
		success: boolean;
		error: string;
	};
};
export const RENAME_DATA_SET: TypedDocumentNode<RenameDataSet> = gql`
	mutation RenameDataSet($dataSetId: ID!, $dataSetName: String!) {
		renameDataSet(dataSetId: $dataSetId, dataSetName: $dataSetName) {
			success
			error
		}
	}
`;

export const SAVE_CURRENT_DATA_SET = gql`
	mutation SaveDataSet($dataSetId: ID!, $content: String!) {
		saveDataSet(dataSetId: $dataSetId, content: $content) {
			success
			error
			dataSetId
			savedDate
		}
	}
`;

export const SAVE_CURRENT_ACCOUNT = gql`
	mutation UpdateCurrentAccount($firstName: String!, $lastName: String!, $email: String!, $country: String!, $region: String) {
		updateCurrentAccount(firstName: $firstName, lastName: $lastName, email: $email, country: $country, region: $region) {
			success
		}
	}
`;

export const SAVE_ACCOUNT = gql`
	mutation UpdateAccount(
		$accountId: ID!
		$accountStatus: AccountStatus
		$firstName: String!
		$lastName: String!
		$email: String!
		$country: String!
		$region: String
		$expiryDate: String
	) {
		updateAccount(
			accountId: $accountId
			accountStatus: $accountStatus
			firstName: $firstName
			lastName: $lastName
			email: $email
			country: $country
			region: $region
			expiryDate: $expiryDate
		) {
			success
		}
	}
`;

export const UPDATE_PASSWORD = gql`
	mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
		updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
			success
			error
		}
	}
`;

export const CREATE_USER_ACCOUNT = gql`
	mutation CreateUserAccount(
		$firstName: String!
		$lastName: String!
		$email: String!
		$country: String
		$region: String
		$accountStatus: AccountStatus
		$expiryDate: String
		$oneTimePassword: String
	) {
		createUserAccount(
			firstName: $firstName
			lastName: $lastName
			email: $email
			country: $country
			region: $region
			accountStatus: $accountStatus
			expiryDate: $expiryDate
			oneTimePassword: $oneTimePassword
		) {
			success
		}
	}
`;
