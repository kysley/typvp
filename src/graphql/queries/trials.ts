import gql from 'graphql-tag'

export const TRIALS = gql`
  query trials {
    trials {
      name
      id
      difficulty
      minWordLength
      maxWordLength
    }
  }
`

export const TRIAL = gql`
  query trial($trialId: ID!) {
    trial(trialId: $trialId) {
      name
      id
      wordSet
      difficulty
      minWordLength
      maxWordLength
    }
  }
`
