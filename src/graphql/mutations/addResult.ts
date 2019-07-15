import gql from 'graphql-tag'

const ADD_RESULT = gql`
  mutation addResults(
    $cpm: Int!
    $rawCpm: Int!
    $wpm: Int!
    $correct: Int!
    $incorrect: Int!
    $corrections: Int!
  ) {
    addResults(
      cpm: $cpm
      rawCpm: $rawCpm
      wpm: $wpm
      correct: $correct
      incorrect: $incorrect
      corrections: $corrections
    ) {
      cpm
      rawCpm
      wpm
      correct
      incorrect
      corrections
    }
  }
`

export default ADD_RESULT
