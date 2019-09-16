import styled, {css} from 'styled-components'

import {colors} from '@/styled/Theme'

const TypingAreaContainer = styled.div`
  display: grid;
  grid-row-gap: 1em;
  justify-self: center;
  /* background: ${colors.background.tint1}; */
  background: ${({theme}) => theme.backgrounds.accent};
  /* border: 1px solid ${({theme}) => theme.border.default}; */
  border-radius: 6px;
  padding: 1em;
  z-index: 1;
`

interface ITypingAreaInner {
  disabled?: boolean
}

const TypingAreaInner = styled.div<ITypingAreaInner>`
  position: relative;
  height: 150px;
  overflow: hidden;

  ${p =>
    p.disabled &&
    css`
      &::after {
        display: block;
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: ${({theme}) => theme.backgrounds.accent};
        top: 180%;
        opacity: 0.5;
      }
    `}
`

export {TypingAreaContainer, TypingAreaInner}
