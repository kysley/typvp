import gql from 'graphql-tag'

export const ME = gql`
  query me {
    me {
      color
      confirmed
      email
      lastPlayed
      lastSeen
      role
      username
      id
    }
  }
`
