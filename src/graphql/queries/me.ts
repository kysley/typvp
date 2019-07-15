import gql from 'graphql-tag'

const ME = gql`
  query me {
    me {
      id
      username
      role
      email
    }
  }
`

export default ME
