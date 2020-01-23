import gql from 'graphql-tag'

export const LOBBIES = gql`
  query lobbies {
    lobbies {
      id
      default
      countdown
      secondsRemaining
      acceptUpdates
      name
      state
      players {
        id
        wpm
        name
      }
    }
  }
`
