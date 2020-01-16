import gql from 'graphql-tag'

export const ADD_RESULT = gql`
  mutation addNewResult(
    $cpm: Int!
    $rawCpm: Int!
    $wpm: Int!
    $correct: Int!
    $incorrect: Int!
    $corrections: Int!
    $wordIndex: Int!
  ) {
    addNewResult(
      result: {
        cpm: $cpm
        rawCpm: $rawCpm
        wpm: $wpm
        correct: $correct
        incorrect: $incorrect
        corrections: $corrections
        wordIndex: $wordIndex
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
    $wordIndex: Int!
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
        wordIndex: $wordIndex
      }
    )
  }
`

export const GET_WORD_SET = gql`
  mutation getWordSet {
    getWordSet
  }
`

export const SAVE_WORD_SET = gql`
  mutation saveWordSet($wordSet: String!) {
    saveWordSet(wordSet: $wordSet)
  }
`
