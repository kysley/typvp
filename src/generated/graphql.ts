export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
   __typename?: 'Account';
  color?: Maybe<Scalars['String']>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  lastPlayed?: Maybe<ResultType>;
  lastSeen: Scalars['DateTime'];
  password: Scalars['String'];
  role: Role;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  usernameLowercase?: Maybe<Scalars['String']>;
  tests?: Maybe<Array<Test>>;
  trials?: Maybe<Array<Trial>>;
};


export type AccountTestsArgs = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AccountTrialsArgs = {
  where?: Maybe<TrialWhereInput>;
  orderBy?: Maybe<TrialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TrialWhereUniqueInput>;
  before?: Maybe<TrialWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AccountLoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AccountResultsResponse = {
   __typename?: 'accountResultsResponse';
  count: Scalars['Int'];
  results: Array<Test>;
};

export type AccountWhereInput = {
  color?: Maybe<NullableStringFilter>;
  confirmed?: Maybe<BooleanFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  lastPlayed?: Maybe<NullableResultTypeFilter>;
  lastSeen?: Maybe<DateTimeFilter>;
  password?: Maybe<StringFilter>;
  role?: Maybe<RoleFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  username?: Maybe<StringFilter>;
  usernameLowercase?: Maybe<NullableStringFilter>;
  tests?: Maybe<TestFilter>;
  trials?: Maybe<TrialFilter>;
  AND?: Maybe<Array<AccountWhereInput>>;
  OR?: Maybe<Array<AccountWhereInput>>;
  NOT?: Maybe<Array<AccountWhereInput>>;
};

export type AccountWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  usernameLowercase?: Maybe<Scalars['String']>;
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  token: Scalars['String'];
  account: Account;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export enum Difficulty {
  Easy = 'EASY',
  Normal = 'NORMAL',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export type ExclusiveAccountCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ExclusiveAccountUpdateInput = {
  color?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type ExclusiveCreateOneTestInput = {
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  incorrect: Scalars['Int'];
  rawCpm: Scalars['Int'];
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
};

export type ExclusiveUpdateOneTrialInput = {
  wordSet?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  updateAccount: Account;
  createAccount: AuthPayload;
  login: AuthPayload;
  createPersonalWordset: Scalars['Boolean'];
  updateTrial: Trial;
  deleteTrial: Trial;
  createNewResult: Scalars['Boolean'];
};


export type MutationUpdateAccountArgs = {
  data: ExclusiveAccountUpdateInput;
};


export type MutationCreateAccountArgs = {
  data: ExclusiveAccountCreateInput;
};


export type MutationLoginArgs = {
  test: AccountLoginInput;
};


export type MutationCreatePersonalWordsetArgs = {
  wordSet: Scalars['String'];
};


export type MutationUpdateTrialArgs = {
  data: ExclusiveUpdateOneTrialInput;
  where: TrialWhereUniqueInput;
};


export type MutationDeleteTrialArgs = {
  trialId: Scalars['ID'];
};


export type MutationCreateNewResultArgs = {
  data: ExclusiveCreateOneTestInput;
};

export type NullableBooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type NullableDifficultyFilter = {
  equals?: Maybe<Difficulty>;
  not?: Maybe<Difficulty>;
  in?: Maybe<Array<Difficulty>>;
  notIn?: Maybe<Array<Difficulty>>;
};

export type NullableIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type NullableResultTypeFilter = {
  equals?: Maybe<ResultType>;
  not?: Maybe<ResultType>;
  in?: Maybe<Array<ResultType>>;
  notIn?: Maybe<Array<ResultType>>;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
   __typename?: 'Query';
  account?: Maybe<Account>;
  me?: Maybe<Account>;
  accountResults: AccountResultsResponse;
  trialLeaders: Array<Test>;
  leaderboard: Array<Test>;
  getWordset: Scalars['String'];
  trial?: Maybe<Trial>;
  trials: Array<Trial>;
};


export type QueryAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type QueryAccountResultsArgs = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
};


export type QueryTrialLeadersArgs = {
  trialId: Scalars['ID'];
};


export type QueryLeaderboardArgs = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTrialArgs = {
  where: TrialWhereUniqueInput;
};


export type QueryTrialsArgs = {
  where?: Maybe<TrialWhereInput>;
  orderBy?: Maybe<TrialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TrialWhereUniqueInput>;
  before?: Maybe<TrialWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum ResultType {
  Singleplayer = 'SINGLEPLAYER',
  Race = 'RACE',
  Trial = 'TRIAL'
}

export type ResultTypeFilter = {
  equals?: Maybe<ResultType>;
  not?: Maybe<ResultType>;
  in?: Maybe<Array<ResultType>>;
  notIn?: Maybe<Array<ResultType>>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Pro = 'PRO',
  Beta = 'BETA'
}

export type RoleFilter = {
  equals?: Maybe<Role>;
  not?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  notIn?: Maybe<Array<Role>>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Test = {
   __typename?: 'Test';
  correct: Scalars['Int'];
  corrections: Scalars['Int'];
  cpm: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  incorrect: Scalars['Int'];
  rawCpm: Scalars['Int'];
  type: ResultType;
  updatedAt: Scalars['DateTime'];
  wordIndex: Scalars['Int'];
  wpm: Scalars['Int'];
  trialId?: Maybe<Scalars['String']>;
  accountId: Scalars['String'];
  trial?: Maybe<Trial>;
  account: Account;
};

export type TestFilter = {
  every?: Maybe<TestWhereInput>;
  some?: Maybe<TestWhereInput>;
  none?: Maybe<TestWhereInput>;
};

export type TestOrderByInput = {
  correct?: Maybe<OrderByArg>;
  corrections?: Maybe<OrderByArg>;
  cpm?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  incorrect?: Maybe<OrderByArg>;
  rawCpm?: Maybe<OrderByArg>;
  type?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
  wordIndex?: Maybe<OrderByArg>;
  wpm?: Maybe<OrderByArg>;
  trial?: Maybe<OrderByArg>;
  trialId?: Maybe<OrderByArg>;
  account?: Maybe<OrderByArg>;
  accountId?: Maybe<OrderByArg>;
};

export type TestWhereInput = {
  correct?: Maybe<IntFilter>;
  corrections?: Maybe<IntFilter>;
  cpm?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  incorrect?: Maybe<IntFilter>;
  rawCpm?: Maybe<IntFilter>;
  type?: Maybe<ResultTypeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  wordIndex?: Maybe<IntFilter>;
  wpm?: Maybe<IntFilter>;
  trialId?: Maybe<NullableStringFilter>;
  accountId?: Maybe<StringFilter>;
  AND?: Maybe<Array<TestWhereInput>>;
  OR?: Maybe<Array<TestWhereInput>>;
  NOT?: Maybe<Array<TestWhereInput>>;
  trial?: Maybe<TrialWhereInput>;
  account?: Maybe<AccountWhereInput>;
};

export type TestWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Trial = {
   __typename?: 'Trial';
  createdAt: Scalars['DateTime'];
  custom?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Difficulty>;
  id: Scalars['String'];
  maxWordLength?: Maybe<Scalars['Int']>;
  minWordLength?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  private?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  wordSet: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Test>>;
  owner?: Maybe<Account>;
};


export type TrialResultsArgs = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TrialFilter = {
  every?: Maybe<TrialWhereInput>;
  some?: Maybe<TrialWhereInput>;
  none?: Maybe<TrialWhereInput>;
};

export type TrialOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
  custom?: Maybe<OrderByArg>;
  difficulty?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  maxWordLength?: Maybe<OrderByArg>;
  minWordLength?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  private?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
  wordSet?: Maybe<OrderByArg>;
  owner?: Maybe<OrderByArg>;
  ownerId?: Maybe<OrderByArg>;
};

export type TrialWhereInput = {
  createdAt?: Maybe<DateTimeFilter>;
  custom?: Maybe<NullableBooleanFilter>;
  difficulty?: Maybe<NullableDifficultyFilter>;
  id?: Maybe<StringFilter>;
  maxWordLength?: Maybe<NullableIntFilter>;
  minWordLength?: Maybe<NullableIntFilter>;
  name?: Maybe<StringFilter>;
  private?: Maybe<NullableBooleanFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  wordSet?: Maybe<StringFilter>;
  results?: Maybe<TestFilter>;
  ownerId?: Maybe<NullableStringFilter>;
  AND?: Maybe<Array<TrialWhereInput>>;
  OR?: Maybe<Array<TrialWhereInput>>;
  NOT?: Maybe<Array<TrialWhereInput>>;
  owner?: Maybe<AccountWhereInput>;
};

export type TrialWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CreateAccountMutationVariables = {
  data: ExclusiveAccountCreateInput;
};


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'color' | 'confirmed' | 'email' | 'lastPlayed' | 'lastSeen' | 'role' | 'username' | 'id'>
    ) }
  ) }
);

export type CreateNewResultMutationVariables = {
  data: ExclusiveCreateOneTestInput;
};


export type CreateNewResultMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNewResult'>
);

export type CreatePersonalWordsetMutationVariables = {
  wordSet: Scalars['String'];
};


export type CreatePersonalWordsetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPersonalWordset'>
);

export type LoginMutationVariables = {
  data: AccountLoginInput;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'color' | 'confirmed' | 'email' | 'lastPlayed' | 'lastSeen' | 'role' | 'username' | 'id'>
    ) }
  ) }
);

export type UpdateAccountMutationVariables = {
  data: ExclusiveAccountUpdateInput;
};


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'color' | 'confirmed' | 'email' | 'lastPlayed' | 'lastSeen' | 'role' | 'username'>
  ) }
);

export type AccountResultsQueryVariables = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
};


export type AccountResultsQuery = (
  { __typename?: 'Query' }
  & { accountResults: (
    { __typename?: 'accountResultsResponse' }
    & Pick<AccountResultsResponse, 'count'>
    & { results: Array<(
      { __typename?: 'Test' }
      & Pick<Test, 'correct' | 'corrections' | 'cpm' | 'createdAt' | 'incorrect' | 'rawCpm' | 'type' | 'wordIndex' | 'wpm'>
    )> }
  ) }
);

export type GetWordsetQueryVariables = {};


export type GetWordsetQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getWordset'>
);

export type LeaderboardQueryVariables = {
  where?: Maybe<TestWhereInput>;
  orderBy?: Maybe<TestOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TestWhereUniqueInput>;
  before?: Maybe<TestWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type LeaderboardQuery = (
  { __typename?: 'Query' }
  & { leaderboard: Array<(
    { __typename?: 'Test' }
    & Pick<Test, 'correct' | 'corrections' | 'cpm' | 'createdAt' | 'incorrect' | 'rawCpm' | 'type' | 'wordIndex' | 'wpm'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'color' | 'confirmed' | 'email' | 'lastPlayed' | 'lastSeen' | 'role' | 'username' | 'id'>
  )> }
);

export type TrialQueryVariables = {
  where: TrialWhereUniqueInput;
};


export type TrialQuery = (
  { __typename?: 'Query' }
  & { trial?: Maybe<(
    { __typename?: 'Trial' }
    & Pick<Trial, 'createdAt' | 'custom' | 'difficulty' | 'maxWordLength' | 'minWordLength' | 'name' | 'private' | 'wordSet'>
  )> }
);

export type TrialsQueryVariables = {
  where?: Maybe<TrialWhereInput>;
  orderBy?: Maybe<TrialOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TrialWhereUniqueInput>;
  before?: Maybe<TrialWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type TrialsQuery = (
  { __typename?: 'Query' }
  & { trials: Array<(
    { __typename?: 'Trial' }
    & Pick<Trial, 'createdAt' | 'custom' | 'difficulty' | 'maxWordLength' | 'minWordLength' | 'name' | 'private' | 'wordSet'>
  )> }
);
