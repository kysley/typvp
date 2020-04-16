import gql from 'graphql-tag'

export const CREATE_NEW_RESULT = gql`
  mutation createNewResult($data: ExclusiveCreateOneTestInput!) {
    createNewResult(data: $data)
  }
`
