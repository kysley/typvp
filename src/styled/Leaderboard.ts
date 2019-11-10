import styled from 'styled-components'

export const LeaderboardGrid = styled.main`
  display: grid;
  grid-row-gap: 0.5em;
  align-self: center;
  width: 80%;
  position: relative;
  margin-bottom: 10em;
`

export const LeaderboardHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  font-weight: 900;
  font-size: 1.25rem;
  border-radius: 6px;
  color: ${({theme}) => theme.colors.accentText};
  background-color: ${({theme}) => theme.backgrounds.primary};

  span:not(:first-of-type) {
    text-align: right;
  }
`

export const LeaderboardRanking = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  padding: 0.25em 2em;
  border-radius: 6px;
  color: ${({theme}) => theme.colors.text};

  p:not(:first-of-type) {
    text-align: right;
  }

  :nth-child(odd) {
    background-color: ${({theme}) => theme.backgrounds.secondary};
  }
`
