import gql from 'graphql-tag'

import {AccountFragmentWithResults, ResultFragment} from '@/graphql/fragments'

const ME = gql`
  query me {
    me {
      ...AccountResultsFragment
    }
  }
  ${AccountFragmentWithResults}
`

export const MY_RESULTS = gql`
  query myResults($first: Int!, $skip: Int!) {
    myResults(filter: {first: $first, skip: $skip}) {
      ...ResultFragment
    }
  }
  ${ResultFragment}
`

export default ME
