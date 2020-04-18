import gql from 'graphql-tag'

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($data: ExclusiveAccountUpdateInput!) {
    updateAccount(data: $data) {
      color
      confirmed
      email
      lastPlayed
      lastSeen
      role
      username
    }
  }
`
