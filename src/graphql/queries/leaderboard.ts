import gql from 'graphql-tag'

export const LEADERBOARD = gql`
  query leaderboard(
    $where: TestWhereInput
    $orderBy: TestOrderByInput
    $skip: Int
    $after: TestWhereUniqueInput
    $before: TestWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    leaderboard(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      correct
      corrections
      cpm
      createdAt
      incorrect
      rawCpm
      type
      wordIndex
      wpm
    }
  }
`
