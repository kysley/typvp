import React, {FC} from 'react'
import styled, {keyframes, css} from 'styled-components'

const pulse = keyframes`
    0% {
      transform: rotate(50deg)
    }
    100% {
      transform: rotate(360deg)
    }
  `
interface IRefreshIcon {
  isSpinning?: boolean
}

const SVG = styled.svg<IRefreshIcon>`
  height: 1.5em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.text};
  transition: all 0.2s ease-out;

  &:hover {
    transform: rotate(50deg);
  }

  ${({isSpinning}) =>
    isSpinning &&
    css`
      animation: ${pulse} 0.5s ease-in-out infinite;
    `}
`

export const RefreshIcon: FC<IRefreshIcon> = ({isSpinning}) => (
  <SVG viewBox="0 0 24 24" isSpinning={isSpinning}>
    <path d="M21 11a1 1 0 00-1 1 8.05 8.05 0 11-2.22-5.5h-2.4a1 1 0 000 2h4.53a1 1 0 001-1V3a1 1 0 00-2 0v1.77A10 10 0 1022 12a1 1 0 00-1-1z" />
  </SVG>
)
