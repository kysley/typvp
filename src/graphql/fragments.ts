import gql from 'graphql-tag'

export const ResultFragment = gql`
  fragment ResultFragment on Test {
    id
    cpm
    rawCpm
    wpm
    correct
    incorrect
    corrections
    wordIndex
    type
    createdAt
  }
`

export const AccountFragment = gql`
  fragment AccountFragment on Account {
    id
    username
    role
    lastSeen
    lastPlayed
  }
`

export const AccountFragmentWithResults = gql`
  fragment AccountResultsFragment on Account {
    ...AccountFragment
    results {
      ...ResultFragment
    }
  }
  ${ResultFragment}
  ${AccountFragment}
`
