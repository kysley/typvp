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

export const ADD_RESULT_TO_TRIAL = gql`
  mutation addResultsToTrial(
    $trialId: ID!
    $cpm: Int!
    $rawCpm: Int!
    $wpm: Int!
    $correct: Int!
    $incorrect: Int!
    $corrections: Int!
  ) {
    addResultsToTrial(
      trialId: $trialId
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
