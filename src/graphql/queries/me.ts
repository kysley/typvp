import gql from 'graphql-tag'

import {AccountFragmentWithResults} from '@/graphql/fragments'

const ME = gql`
  query me {
    me {
      ...AccountResultsFragment
    }
  }
  ${AccountFragmentWithResults}
`

export default ME
