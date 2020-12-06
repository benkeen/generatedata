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
        datasets {
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
