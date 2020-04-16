import gql from 'graphql-tag'

export const TRIAL = gql`
  query trial($where: TrialWhereUniqueInput!) {
    trial(where: $where) {
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
