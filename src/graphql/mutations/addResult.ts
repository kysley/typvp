import gql from 'graphql-tag'

const ADD_RESULT = gql`
  mutation addNewResult(
    $cpm: Int!
    $rawCpm: Int!
    $wpm: Int!
    $correct: Int!
    $incorrect: Int!
    $corrections: Int!
  ) {
    addNewResult(
      result: {
        cpm: $cpm
        rawCpm: $rawCpm
        wpm: $wpm
        correct: $correct
        incorrect: $incorrect
        corrections: $corrections
      }
    )
  }
`

export const ADD_RESULT_TO_TRIAL = gql`
  mutation addNewTrialResult(
    $trialId: ID!
    $cpm: Int!
    $rawCpm: Int!
    $wpm: Int!
    $correct: Int!
    $incorrect: Int!
    $corrections: Int!
  ) {
    addNewTrialResult(
      result: {
        trialId: $trialId
        cpm: $cpm
        rawCpm: $rawCpm
        wpm: $wpm
        correct: $correct
        incorrect: $incorrect
        corrections: $corrections
      }
    )
  }
`

export default ADD_RESULT
