import styled from 'styled-components'

import {colors} from '@/styled/Theme'

const TypingAreaContainer = styled.div`
  display: grid;
  grid-row-gap: 1em;
  justify-self: center;
  background: ${colors.background.tint1};
  border-radius: 6px;
  padding: 1em;
`

const TypingAreaInner = styled.div`
  height: 150px;
  overflow: hidden;
`

export {TypingAreaContainer, TypingAreaInner}
