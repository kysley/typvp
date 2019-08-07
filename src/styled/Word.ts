import styled, {css} from 'styled-components'

import {colors} from '@/styled/Theme'

interface SingleWordProps {
  variant: 'current' | 'done' | 'awaiting'
  isMatch: boolean | undefined
}

const SingleWord = styled.span<SingleWordProps>`
  font-size: 1.2rem;
  margin-bottom: 4px;
  padding: 4px 5px;
  border-radius: 5px;
  display: inline-block;

  color: ${({variant, isMatch, theme}) =>
    variant === 'done'
      ? isMatch
        ? theme.colors.match
        : theme.colors.incorrect
      : theme.colors.text};
  color: ${({variant, theme}) => variant === 'current' && theme.colors.current};
`

export default SingleWord
