import { gql, TypedDocumentNode } from '@apollo/client';
import type { AuthResponse, GeneralResponse, SavedDataSetResponse } from '@generatedata/server';

export const REFRESH_TOKEN: TypedDocumentNode<{ refreshToken: AuthResponse | null }> = gql`
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

export const SEND_PASSWORD_RESET_EMAIL_MUTATION: TypedDocumentNode<{ sendPasswordResetEmail: GeneralResponse | null }> = gql`
  mutation SendPasswordResetEmailMutation($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;

export const UPDATE_DATA_SET_GENERATION_COUNT: TypedDocumentNode<{ updateDataSetGenerationCount: GeneralResponse | null }> = gql`
  mutation UpdateDataSetGenerationCount($dataSetId: ID!, $generatedRows: Int!) {
    updateDataSetGenerationCount(dataSetId: $dataSetId, generatedRows: $generatedRows) {
      success
      error
    }
  }
`;

export const LOGIN_MUTATION: TypedDocumentNode<{ login: AuthResponse | null }> = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenExpiry
      error
      refreshToken
      success
      accountId
      firstName
      lastName
      email
      country
      region
      expiryDate
      accountType
      accountStatus
      dateCreated
      numRowsGenerated
      profileImage
      wasOneTimeLogin
    }
  }
`;

export const LOGIN_WITH_GOOGLE: TypedDocumentNode<{ loginWithGoogle: AuthResponse | null }> = gql`
  mutation LoginWithGoogle($googleToken: String!) {
    loginWithGoogle(googleToken: $googleToken) {
      token
      refreshToken
      tokenExpiry
      success
      error
      firstName
      lastName
      expiryDate
      accountType
      dateCreated
      email
      numRowsGenerated
      profileImage
      country
      region
    }
  }
`;

export const CREATE_USER_ACCOUNT: TypedDocumentNode<{ createUserAccount: GeneralResponse | null }> = gql`
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

export const DELETE_DATA_SET: TypedDocumentNode<{ deleteDataSet: GeneralResponse | null }> = gql`
  mutation DeleteDataSet($dataSetId: ID!) {
    deleteDataSet(dataSetId: $dataSetId) {
      success
      error
    }
  }
`;

export const SAVE_NEW_DATA_SET: TypedDocumentNode<{ saveNewDataSet: SavedDataSetResponse | null }> = gql`
  mutation SaveNewDataSet($dataSetName: String!, $content: String!) {
    saveNewDataSet(dataSetName: $dataSetName, content: $content) {
      success
      error
      dataSetId
      savedDate
    }
  }
`;

export const RENAME_DATA_SET: TypedDocumentNode<{ renameDataSet: GeneralResponse | null }> = gql`
  mutation RenameDataSet($dataSetId: ID!, $dataSetName: String!) {
    renameDataSet(dataSetId: $dataSetId, dataSetName: $dataSetName) {
      success
      error
    }
  }
`;

export const SAVE_CURRENT_DATA_SET: TypedDocumentNode<{ saveDataSet: SavedDataSetResponse | null }> = gql`
  mutation SaveDataSet($dataSetId: ID!, $content: String!) {
    saveDataSet(dataSetId: $dataSetId, content: $content) {
      success
      error
      dataSetId
      savedDate
    }
  }
`;

export const SAVE_CURRENT_ACCOUNT: TypedDocumentNode<{ updateCurrentAccount: GeneralResponse | null }> = gql`
  mutation UpdateCurrentAccount($firstName: String!, $lastName: String!, $email: String!, $country: String!, $region: String) {
    updateCurrentAccount(firstName: $firstName, lastName: $lastName, email: $email, country: $country, region: $region) {
      success
    }
  }
`;

export const SAVE_ACCOUNT: TypedDocumentNode<{ updateAccount: GeneralResponse | null }> = gql`
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

export const UPDATE_PASSWORD: TypedDocumentNode<{ updatePassword: GeneralResponse | null }> = gql`
  mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      error
    }
  }
`;

export const DELETE_ACCOUNT: TypedDocumentNode<{ deleteAccount: GeneralResponse | null }> = gql`
  mutation DeleteAccount($accountId: ID!) {
    deleteAccount(accountId: $accountId) {
      success
      error
    }
  }
`;
