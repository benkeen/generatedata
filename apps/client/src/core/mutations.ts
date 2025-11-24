import { gql, TypedDocumentNode } from '@apollo/client';
import type { Mutation } from '@generatedata/graphql-schema';

export const REFRESH_TOKEN: TypedDocumentNode<Mutation> = gql`
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

export const SEND_PASSWORD_RESET_EMAIL_MUTATION: TypedDocumentNode<Mutation> = gql`
  mutation SendPasswordResetEmailMutation($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;

export const UPDATE_DATA_SET_GENERATION_COUNT: TypedDocumentNode<Mutation> = gql`
  mutation UpdateDataSetGenerationCount($dataSetId: ID!, $generatedRows: Int!) {
    updateDataSetGenerationCount(dataSetId: $dataSetId, generatedRows: $generatedRows) {
      success
      error
    }
  }
`;
