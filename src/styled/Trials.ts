import styled from 'styled-components'

import {colors} from '@/styled/Theme'

export const TrialCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2em;

  a {
    text-decoration: none !important;
  }
`

interface IDifficulty {
  difficulty: 'EASY' | 'NORMAL' | 'MEDIUM' | 'HARD'
}

const DifficultyColour = {
  EASY: colors.g300,
  NORMAL: colors.b300,
  MEDIUM: colors.y300,
  HARD: colors.r300,
}

export const TrialCard = styled.div<IDifficulty>`
  border-radius: 6px;
  background: ${({theme}) => theme.backgrounds.accent};
  color: ${({theme}) => theme.colors.text};
  padding: 1em;
  border-top: 3px solid ${({difficulty}) => DifficultyColour[difficulty]};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

export const TrialName = styled.h1`
  font-weight: 400;
  font-size: 1.2rem;
  margin: 0;
`

export const TrialDifficulty = styled.span<IDifficulty>`
  display: inline-block;
  font-size: 0.82rem;
  border: 1px solid ${({theme}) => theme.border.default};
  border-radius: 3px;
  color: ${({difficulty}) => DifficultyColour[difficulty]};
  padding: 0.25em;
  margin: 1em 0;
  font-weight: 700;
`

export const TrialFold = styled.div`
  border-top: 1px solid ${({theme}) => theme.border.default};
  display: flex;
  justify-content: space-around;
  padding-top: 1em;

  p {
    font-size: 0.85rem;
    margin: 0;
  }
`
