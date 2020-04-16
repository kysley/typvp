// import gql from 'graphql-tag'

// import {AccountFragmentWithResults, ResultFragment} from '@/graphql/fragments'

// export const ME = gql`
//   query me {
//     me {
//       ...AccountResultsFragment
//       email
//       confirmed
//     }
//   }
//   ${AccountFragmentWithResults}
// `

// export const MY_RESULTS = gql`
//   query myResults($first: Int!, $skip: Int!, $date: String, $type: String) {
//     me {
//       testCountByType(filter: $type)
//       filterResults(
//         filter: {first: $first, skip: $skip, date: $date, type: $type}
//       ) {
//         ...ResultFragment
//       }
//     }
//   }
//   ${ResultFragment}
// `

// export const MY_TRIALS = gql`
//   query myTrials {
//     myTrials {
//       name
//       id
//       difficulty
//       minWordLength
//       maxWordLength
//       custom
//       private
//     }
//   }
// `
