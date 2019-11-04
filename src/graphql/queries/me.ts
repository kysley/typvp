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
  query myResults {
    myResults {
      ...ResultFragment
    }
  }
  ${ResultFragment}
`

export default ME
