import gql from 'graphql-tag'

import {AccountFragment} from '../fragments'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) {
      token
      account {
        ...AccountFragment
      }
    }
  }
  ${AccountFragment}
`

export default LOGIN
