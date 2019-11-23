import React, {FC} from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  /* right: 1vw; */
  /* width: 2em; */
  height: 1.5em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.text};
`

export const CheckmarkIcon: FC = () => (
  <SVG viewBox="0 0 24 24">
    <path d="M18.71 7.21a1 1 0 00-1.42 0l-7.45 7.46-3.13-3.14A1 1 0 105.29 13l3.84 3.84a1 1 0 001.42 0l8.16-8.16a1 1 0 000-1.47z" />
  </SVG>
)
