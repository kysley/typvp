import React, {FC} from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  /* right: 1vw; */
  /* width: 2em; */
  height: 1.5em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.accentText};
`

export const EnterIcon: FC = () => (
  <SVG viewBox="0 0 100 100">
    <switch>
      <g>
        <path d="M51.8 54.3l-3.1 3.1c-1.7 1.7-1.7 4.4 0 6 .8.8 1.9 1.3 3 1.3s2.2-.4 3-1.3L65.1 53c1.7-1.7 1.7-4.4 0-6L54.7 36.5c-1.7-1.7-4.4-1.7-6 0-1.7 1.7-1.7 4.4 0 6l3.1 3.1H37.7C21.2 45.6 7.8 59 7.8 75.5c0 2.4 1.9 4.3 4.3 4.3s4.3-1.9 4.3-4.3c0-11.8 9.6-21.3 21.3-21.3h14.1z" />
        <path d="M87.9 2.5H35.6c-2.4 0-4.3 1.9-4.3 4.3v22.8c0 2.4 1.9 4.3 4.3 4.3s4.3-1.9 4.3-4.3V11h43.7v78H39.9V70.4c0-2.4-1.9-4.3-4.3-4.3s-4.3 1.9-4.3 4.3v22.8c0 2.4 1.9 4.3 4.3 4.3h52.3c2.4 0 4.3-1.9 4.3-4.3V6.8c0-2.4-1.9-4.3-4.3-4.3z" />
      </g>
    </switch>
  </SVG>
)