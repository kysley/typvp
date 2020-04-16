import gql from 'graphql-tag'

export const TRIALS = gql`
  query trials(
    $where: TrialWhereInput
    $orderBy: TrialOrderByInput
    $skip: Int
    $after: TrialWhereUniqueInput
    $before: TrialWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    trials(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      createdAt
      custom
      difficulty
      maxWordLength
      minWordLength
      name
      private
      wordSet
    }
  }
`
