import { gql, TypedDocumentNode } from '@apollo/client';
import type { Query } from '@generatedata/server';

export const GET_ACCOUNTS: TypedDocumentNode<Query> = gql`
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
export const GET_DATA_SET_HISTORY: TypedDocumentNode<Query> = gql`
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

export const GET_DATA_SETS: TypedDocumentNode<Query> = gql`
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
