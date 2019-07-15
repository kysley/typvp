import gql from 'graphql-tag'

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      account {
        id
        username
        email
        role
      }
    }
  }
`

export default SIGNUP
