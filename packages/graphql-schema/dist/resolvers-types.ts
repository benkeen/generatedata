import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  accountId: Scalars['ID']['output'];
  accountStatus?: Maybe<AccountStatus>;
  accountType?: Maybe<AccountType>;
  country?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['ID']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errorStatus?: Maybe<Error>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastLoggedIn?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  numRowsGenerated?: Maybe<Scalars['Int']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export enum AccountStatus {
  Disabled = 'disabled',
  Expired = 'expired',
  Live = 'live'
}

export enum AccountType {
  Admin = 'admin',
  Superuser = 'superuser',
  User = 'user'
}

export type AccountsResults = {
  __typename?: 'AccountsResults';
  errorStatus?: Maybe<Error>;
  results?: Maybe<Array<Maybe<Account>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accountId?: Maybe<Scalars['ID']['output']>;
  accountStatus?: Maybe<AccountStatus>;
  accountType?: Maybe<AccountType>;
  country?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  numRowsGenerated?: Maybe<Scalars['Int']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenExpiry?: Maybe<Scalars['Int']['output']>;
  wasOneTimeLogin?: Maybe<Scalars['Boolean']['output']>;
};

export type DataSet = {
  __typename?: 'DataSet';
  accountId?: Maybe<Scalars['ID']['output']>;
  dataSetId?: Maybe<Scalars['ID']['output']>;
  dataSetName?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  history?: Maybe<Array<Maybe<DataSetHistory>>>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  numRowsGenerated?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type DataSetHistory = {
  __typename?: 'DataSetHistory';
  content?: Maybe<Scalars['String']['output']>;
  dataSetId: Scalars['ID']['output'];
  dateCreated?: Maybe<Scalars['String']['output']>;
  historyId: Scalars['ID']['output'];
};

export type DataSetHistoryResults = {
  __typename?: 'DataSetHistoryResults';
  results?: Maybe<Array<Maybe<DataSetHistory>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type DataSetListItem = {
  __typename?: 'DataSetListItem';
  content?: Maybe<Scalars['String']['output']>;
  dataCreatedUnix?: Maybe<Scalars['Int']['output']>;
  dataSetId?: Maybe<Scalars['ID']['output']>;
  dataSetName?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  historyDateCreatedUnix?: Maybe<Scalars['Int']['output']>;
  historyId?: Maybe<Scalars['ID']['output']>;
  numRowsGenerated?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type DataSetResults = {
  __typename?: 'DataSetResults';
  results?: Maybe<Array<Maybe<DataSetListItem>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Error = {
  __typename?: 'Error';
  errorStatus?: Maybe<ErrorStatus>;
};

export enum ErrorStatus {
  PermissionDenied = 'permissionDenied'
}

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserAccount?: Maybe<GeneralResponse>;
  deleteAccount?: Maybe<GeneralResponse>;
  deleteDataSet?: Maybe<GeneralResponse>;
  login?: Maybe<AuthResponse>;
  loginWithGoogle?: Maybe<AuthResponse>;
  logout?: Maybe<GeneralResponse>;
  refreshToken?: Maybe<AuthResponse>;
  renameDataSet?: Maybe<GeneralResponse>;
  saveDataSet?: Maybe<SavedDataSetResponse>;
  saveNewDataSet?: Maybe<SavedDataSetResponse>;
  sendPasswordResetEmail?: Maybe<GeneralResponse>;
  updateAccount?: Maybe<GeneralResponse>;
  updateCurrentAccount?: Maybe<GeneralResponse>;
  updateDataSetGenerationCount?: Maybe<GeneralResponse>;
  updatePassword?: Maybe<GeneralResponse>;
};


export type MutationCreateUserAccountArgs = {
  accountStatus?: InputMaybe<AccountStatus>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  oneTimePassword?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['ID']['input'];
};


export type MutationDeleteDataSetArgs = {
  dataSetId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginWithGoogleArgs = {
  googleToken: Scalars['String']['input'];
};


export type MutationRenameDataSetArgs = {
  dataSetId: Scalars['ID']['input'];
  dataSetName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveDataSetArgs = {
  content: Scalars['String']['input'];
  dataSetId: Scalars['ID']['input'];
};


export type MutationSaveNewDataSetArgs = {
  content: Scalars['String']['input'];
  dataSetName: Scalars['String']['input'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAccountArgs = {
  accountId: Scalars['ID']['input'];
  accountStatus?: InputMaybe<AccountStatus>;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCurrentAccountArgs = {
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDataSetGenerationCountArgs = {
  dataSetId?: InputMaybe<Scalars['ID']['input']>;
  generatedRows?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts?: Maybe<AccountsResults>;
  dataSet?: Maybe<DataSet>;
  dataSetHistory?: Maybe<DataSetHistoryResults>;
  dataSets?: Maybe<DataSetResults>;
  settings?: Maybe<Array<Maybe<Setting>>>;
};


export type QueryAccountsArgs = {
  filterStr?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortCol?: InputMaybe<Scalars['String']['input']>;
  sortDir?: InputMaybe<SortDir>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDataSetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDataSetHistoryArgs = {
  dataSetId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDataSetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortCol?: InputMaybe<Scalars['String']['input']>;
  sortDir?: InputMaybe<SortDir>;
};

export type SavedDataSetResponse = {
  __typename?: 'SavedDataSetResponse';
  dataSetId?: Maybe<Scalars['ID']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  savedDate?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Setting = {
  __typename?: 'Setting';
  settingName?: Maybe<Scalars['String']['output']>;
  settingValue?: Maybe<Scalars['String']['output']>;
};

export enum SortDir {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  AccountStatus: AccountStatus;
  AccountType: AccountType;
  AccountsResults: ResolverTypeWrapper<AccountsResults>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DataSet: ResolverTypeWrapper<DataSet>;
  DataSetHistory: ResolverTypeWrapper<DataSetHistory>;
  DataSetHistoryResults: ResolverTypeWrapper<DataSetHistoryResults>;
  DataSetListItem: ResolverTypeWrapper<DataSetListItem>;
  DataSetResults: ResolverTypeWrapper<DataSetResults>;
  Error: ResolverTypeWrapper<Error>;
  ErrorStatus: ErrorStatus;
  GeneralResponse: ResolverTypeWrapper<GeneralResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SavedDataSetResponse: ResolverTypeWrapper<SavedDataSetResponse>;
  Setting: ResolverTypeWrapper<Setting>;
  SortDir: SortDir;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  AccountsResults: AccountsResults;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  DataSet: DataSet;
  DataSetHistory: DataSetHistory;
  DataSetHistoryResults: DataSetHistoryResults;
  DataSetListItem: DataSetListItem;
  DataSetResults: DataSetResults;
  Error: Error;
  GeneralResponse: GeneralResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  SavedDataSetResponse: SavedDataSetResponse;
  Setting: Setting;
  String: Scalars['String']['output'];
}>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accountStatus?: Resolver<Maybe<ResolversTypes['AccountStatus']>, ParentType, ContextType>;
  accountType?: Resolver<Maybe<ResolversTypes['AccountType']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorStatus?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastLoggedIn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numRowsGenerated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AccountsResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountsResults'] = ResolversParentTypes['AccountsResults']> = ResolversObject<{
  errorStatus?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  accountId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  accountStatus?: Resolver<Maybe<ResolversTypes['AccountStatus']>, ParentType, ContextType>;
  accountType?: Resolver<Maybe<ResolversTypes['AccountType']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numRowsGenerated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenExpiry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wasOneTimeLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type DataSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSet'] = ResolversParentTypes['DataSet']> = ResolversObject<{
  accountId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dataSetId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dataSetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSetHistory']>>>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numRowsGenerated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type DataSetHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetHistory'] = ResolversParentTypes['DataSetHistory']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataSetId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  historyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type DataSetHistoryResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetHistoryResults'] = ResolversParentTypes['DataSetHistoryResults']> = ResolversObject<{
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSetHistory']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type DataSetListItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetListItem'] = ResolversParentTypes['DataSetListItem']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataCreatedUnix?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dataSetId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dataSetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  historyDateCreatedUnix?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  historyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  numRowsGenerated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type DataSetResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetResults'] = ResolversParentTypes['DataSetResults']> = ResolversObject<{
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['DataSetListItem']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  errorStatus?: Resolver<Maybe<ResolversTypes['ErrorStatus']>, ParentType, ContextType>;
}>;

export type GeneralResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralResponse'] = ResolversParentTypes['GeneralResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUserAccount?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserAccountArgs, 'email' | 'firstName' | 'lastName'>>;
  deleteAccount?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'accountId'>>;
  deleteDataSet?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationDeleteDataSetArgs, 'dataSetId'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  loginWithGoogle?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationLoginWithGoogleArgs, 'googleToken'>>;
  logout?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType>;
  renameDataSet?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationRenameDataSetArgs, 'dataSetId'>>;
  saveDataSet?: Resolver<Maybe<ResolversTypes['SavedDataSetResponse']>, ParentType, ContextType, RequireFields<MutationSaveDataSetArgs, 'content' | 'dataSetId'>>;
  saveNewDataSet?: Resolver<Maybe<ResolversTypes['SavedDataSetResponse']>, ParentType, ContextType, RequireFields<MutationSaveNewDataSetArgs, 'content' | 'dataSetName'>>;
  sendPasswordResetEmail?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationSendPasswordResetEmailArgs, 'email'>>;
  updateAccount?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'accountId' | 'country' | 'email' | 'firstName' | 'lastName'>>;
  updateCurrentAccount?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCurrentAccountArgs, 'country' | 'email' | 'firstName' | 'lastName'>>;
  updateDataSetGenerationCount?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, Partial<MutationUpdateDataSetGenerationCountArgs>>;
  updatePassword?: Resolver<Maybe<ResolversTypes['GeneralResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'currentPassword' | 'newPassword'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  accounts?: Resolver<Maybe<ResolversTypes['AccountsResults']>, ParentType, ContextType, Partial<QueryAccountsArgs>>;
  dataSet?: Resolver<Maybe<ResolversTypes['DataSet']>, ParentType, ContextType, RequireFields<QueryDataSetArgs, 'id'>>;
  dataSetHistory?: Resolver<Maybe<ResolversTypes['DataSetHistoryResults']>, ParentType, ContextType, RequireFields<QueryDataSetHistoryArgs, 'dataSetId'>>;
  dataSets?: Resolver<Maybe<ResolversTypes['DataSetResults']>, ParentType, ContextType, Partial<QueryDataSetsArgs>>;
  settings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Setting']>>>, ParentType, ContextType>;
}>;

export type SavedDataSetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SavedDataSetResponse'] = ResolversParentTypes['SavedDataSetResponse']> = ResolversObject<{
  dataSetId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  savedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = ResolversObject<{
  settingName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settingValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  AccountsResults?: AccountsResultsResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  DataSet?: DataSetResolvers<ContextType>;
  DataSetHistory?: DataSetHistoryResolvers<ContextType>;
  DataSetHistoryResults?: DataSetHistoryResultsResolvers<ContextType>;
  DataSetListItem?: DataSetListItemResolvers<ContextType>;
  DataSetResults?: DataSetResultsResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  GeneralResponse?: GeneralResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SavedDataSetResponse?: SavedDataSetResponseResolvers<ContextType>;
  Setting?: SettingResolvers<ContextType>;
}>;

