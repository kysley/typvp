import styled from 'styled-components'

import {colors} from '@/styled/Theme'

export const SingleplayerContainer = styled.div`
  width: 90%;
  max-width: 750px;
  display: grid;
  align-self: center;
  margin-top: 20vh;
`

export const MetaContainer = styled.div`
  position: relative;
  border-radius: 6px;
  display: grid;
  grid-auto-flow: column;
  background: ${colors.border.muted};
  color: ${colors.black};
  margin-bottom: 1em;
  padding: 1em;
  justify-content: space-between;
  overflow: hidden;
`

export const MetaTimer = styled.div`
  display: block;
  content: '';
  background: ${colors.g300};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  transition: all 1.1s linear;
`
