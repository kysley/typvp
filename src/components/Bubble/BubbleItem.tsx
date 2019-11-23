import React, {FC} from 'react'
import styled from 'styled-components'

import {CheckmarkIcon} from '@/components/icons'
import {colors} from '@/styled/Theme'

export const BubbleItemWrapper = styled.li<any>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 0.85rem;
  justify-content: space-between;
  max-height: 36px;

  :first-of-type {
    border-radius: 6px 6px 0 0;
  }

  :last-of-type {
    border-radius: 0 0 6px 6px;
  }

  &:hover {
    background: ${({theme}) => theme.backgrounds.hover};
  }

  span {
    margin-right: 1em;
  }

  ${({isSelected}) =>
    isSelected &&
    `
      color: ${colors.white};
      background: ${colors.b300} !important;
    `}
`

interface IBubbleItem {
  isSelected: boolean
  handleSelect: (...args: any[]) => any
}

export const BubbleItem: FC<IBubbleItem> = ({
  isSelected,
  handleSelect,
  children,
}) => {
  return (
    <BubbleItemWrapper onClick={handleSelect} isSelected={isSelected}>
      {children}
      {isSelected && <CheckmarkIcon />}
    </BubbleItemWrapper>
  )
}
