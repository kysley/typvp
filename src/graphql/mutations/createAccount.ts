import gql from 'graphql-tag'
export const CREATE_ACCOUNT = gql`
  mutation createAccount($data: ExclusiveAccountCreateInput!) {
    createAccount(data: $data) {
      token
      account {
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
  }
`
