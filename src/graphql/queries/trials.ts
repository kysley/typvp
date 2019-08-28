import gql from 'graphql-tag'

const TRIALS = gql`
  query trials {
    trials {
      name
      id
      wordSet
      difficulty
      minWordLength
      maxWordLength
    }
  }
`

export default TRIALS
