import styled from 'styled-components'

import {colors} from '@/styled/Theme'

export const LeaderboardGrid = styled.main`
  display: grid;
  grid-row-gap: 0.5em;
  align-self: center;
  width: 80%;
  position: relative;
`

export const LeaderboardHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
  font-weight: 900;
  font-size: 1.25rem;
  border-radius: 6px;

  span:not(:first-of-type) {
    text-align: right;
  }
`

export const LeaderboardRanking = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0.25em 2em;
  border-radius: 6px;

  p:not(:first-of-type) {
    text-align: right;
  }

  :nth-child(odd) {
    background-color: ${colors.background.tint2};
  }
`
