import gql from 'graphql-tag'

import {AccountFragment} from '../fragments'

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $username: String!) {
    signup(input: {email: $email, password: $password, username: $username}) {
      token
      account {
        ...AccountFragment
      }
    }
  }
  ${AccountFragment}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) {
      token
      account {
        ...AccountFragment
        confirmed
      }
    }
  }
  ${AccountFragment}
`

export const SEEN = gql`
  mutation seen {
    seen
  }
`

export const UPDATE_COLOR = gql`
  mutation updateAccountColor($color: String!) {
    updateAccountColor(color: $color) {
      ...AccountFragment
    }
  }
  ${AccountFragment}
`
