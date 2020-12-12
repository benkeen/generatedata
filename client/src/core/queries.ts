import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
    query GetAccounts {
        accounts {
            accountId
            firstName
            lastName
            dateCreated
            numRowsGenerated
        }
    }
`;

export const GET_DATA_SETS = gql`
    query GetDataSets {
        dataSets {
            dataSetId
            dataSetName
            status
            dateCreated
			content
            numRowsGenerated
            historyDateCreated
        }
    }
`;

export const GET_DATA_SET = gql`
	query GetDataSet($dataSetId: ID!) {
		dataSet(id: $dataSetId){
            dataSetId
            dataSetName
            status
            dateCreated
            numRowsGenerated
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
		}
	}
`;

export const SAVE_CURRENT_DATA_SET = gql`
	mutation SaveDataSet($dataSetId: ID!, $content: String!) {
		saveDataSet(dataSetId: $dataSetId, content: $content) {
			success
			error
			dataSetId
		}
	}
`;

export const SAVE_ACCOUNT = gql`
	mutation UpdateAccount($firstName: String!, $lastName: String!, $email: String!, $country: String!, $region: String) {
		updateAccount(firstName: $firstName, lastName: $lastName, email: $email, country: $country, region: $region) {
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
