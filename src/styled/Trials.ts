import styled from 'styled-components'

export const TrialCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
`

export const TrialCard = styled.div`
  border-radius: 6px;
  background: ${({theme}) => theme.backgrounds.accent};
  color: ${({theme}) => theme.colors.text};
  padding: 1em;
`
