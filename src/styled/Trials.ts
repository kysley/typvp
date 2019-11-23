import styled from 'styled-components'

import {colors} from '@/styled/Theme'

export const TrialCardGrid = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 2em;
  width: 80%;
  align-self: center;

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
  background: ${({theme}) => theme.backgrounds.secondary};
  color: ${({theme}) => theme.colors.text};
  padding: 1em;
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-in-out;

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    top: 0;
    left: 0;
    background: transparent;
    height: 0px;
    transition: all 0.1s ease-in-out;
    background: ${({difficulty}) => DifficultyColour[difficulty]};
  }

  :hover {
    transform: translateY(-3px);
    &:before {
      height: 2px;
    }
  }
`

export const TrialName = styled.h1`
  font-weight: 400;
  font-size: 1.2rem;
  margin: 0;
`

export const TrialDifficulty = styled.span<IDifficulty>`
  display: inline-block;
  font-size: 0.85rem;
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
