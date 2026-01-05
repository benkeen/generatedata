import * as authResolvers from './auth/mutations';
import * as accountResolvers from './accounts/mutations';
import * as dataSetQueries from './dataSets/queries';
import * as dataSetMutations from './dataSets/mutations';
import { type QueryResolvers, type MutationResolvers } from '@generatedata/graphql-schema';

const query: QueryResolvers = {
  dataSets: dataSetQueries.dataSets,
  dataSetHistory: dataSetQueries.dataSetHistory
};

const mutation: MutationResolvers = {
  // authentication resolvers
  login: authResolvers.login,
  loginWithGoogle: authResolvers.loginWithGoogle,
  sendPasswordResetEmail: authResolvers.sendPasswordResetEmail,
  refreshToken: authResolvers.refreshToken,
  logout: authResolvers.logout,

  // account-related resolvers
  updateAccount: accountResolvers.updateAccount,
  updateCurrentAccount: accountResolvers.updateCurrentAccount,
  updatePassword: accountResolvers.updatePassword,
  createUserAccount: accountResolvers.createUserAccount,
  deleteAccount: accountResolvers.deleteAccount,

  // data-sets
  saveNewDataSet: dataSetMutations.saveNewDataSet,
  renameDataSet: dataSetMutations.renameDataSet,
  saveDataSet: dataSetMutations.saveDataSet,
  deleteDataSet: dataSetMutations.deleteDataSet,
  updateDataSetGenerationCount: dataSetMutations.updateDataSetGenerationCount
};

export default {
  Query: query,
  Mutation: mutation
};
