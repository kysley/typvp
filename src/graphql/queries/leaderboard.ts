import gql from 'graphql-tag'

const LEADERBOARD = gql`
  query leaderboard {
    leaderboard {
      wpm
      correct
      corrections
      incorrect
      cpm
      rawCpm
    }
  }
`

export default LEADERBOARD
