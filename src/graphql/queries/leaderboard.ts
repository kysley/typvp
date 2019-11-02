import gql from 'graphql-tag'

import {ResultFragment} from '@/graphql/fragments'

const LEADERBOARD = gql`
  query leaderboard {
    leaderboard {
      ...ResultFragment
    }
  }
  ${ResultFragment}
`

export default LEADERBOARD
