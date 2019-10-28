import React, {FC} from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  /* right: 1vw; */
  /* width: 2em; */
  height: 1.5em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.accentText};
`

export const UserIcon: FC = () => (
  <SVG viewBox="0 0 100 100">
    <path d="M17.6 87.5c2.2 0 4-1.8 4-4C21.6 70 32.8 59 46.6 59h6.8c13.8 0 25 11 25 24.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-17.9-14.8-32.5-33-32.5h-6.8c-18.2 0-33 14.6-33 32.5 0 2.2 1.8 4 4 4zM32.9 25.1v5.7C32.9 40.3 40.5 48 50 48s17.1-7.7 17.1-17.1v-5.7C67.1 15.7 59.5 8 50 8s-17.1 7.7-17.1 17.1zm26.2 0v5.7c0 5-4.1 9.1-9.1 9.1s-9.1-4.1-9.1-9.1v-5.7c0-5 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1z" />
  </SVG>
)
