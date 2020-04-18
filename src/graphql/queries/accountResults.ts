import gql from 'graphql-tag'

export const ACCOUNT_RESULTS = gql`
  query accountResults(
    $where: TestWhereInput
    $orderBy: TestOrderByInput
    $skip: Int
    $after: TestWhereUniqueInput
    $before: TestWhereUniqueInput
    $first: Int
    $last: Int
    $id: String!
  ) {
    accountResults(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
      id: $id
    ) {
      results {
        correct
        corrections
        cpm
        createdAt
        incorrect
        rawCpm
        type
        wordIndex
        wpm
        id
      }
      count
    }
  }
`
