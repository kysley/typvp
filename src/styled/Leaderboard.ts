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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 6px;
  color: ${({theme}) => theme.colors.accentText};
  background-color: ${({theme}) => theme.backgrounds.primary};
  text-align: right;

  span:first-of-type {
    text-align: left;
  }
`

export const LeaderboardRanking = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0.25em 2em;
  border-radius: 6px;
  color: ${({theme}) => theme.colors.text};
  text-align: right;
  position: relative;
  overflow: hidden;

  p:first-of-type {
    text-align: left;
  }

  :nth-child(odd) {
    background-color: ${({theme}) => theme.backgrounds.secondary};
  }

  :nth-child(2) {
    background-color: #c9b037;
  }

  :nth-child(3) {
    background-color: #d7d7d7;
  }

  :nth-child(4) {
    background-color: #ad8a56;
  }
`
