import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($data: AccountLoginInput!) {
    login(test: $data) {
      token
      account {
        color
        confirmed
        email
        lastPlayed
        lastSeen
        role
        username
      }
    }
  }
`
