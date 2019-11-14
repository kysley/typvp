import gql from 'graphql-tag'

import {ResultFragment} from '@/graphql/fragments'

const LEADERBOARD = gql`
  query leaderboard($first: Int, $skip: Int) {
    leaderboard(filter: {first: $first, skip: $skip}) {
      ...ResultFragment
    }
  }
  ${ResultFragment}
`

export default LEADERBOARD
