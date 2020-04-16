import gql from 'graphql-tag'

export const CREATE_PERSONAL_WORDSET = gql`
  mutation createPersonalWordset($wordSet: String!) {
    createPersonalWordset(wordSet: $wordSet)
  }
`
