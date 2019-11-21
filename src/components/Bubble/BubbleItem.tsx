import React, {FC} from 'react'
import styled from 'styled-components'

import {EnterIcon} from '@/components/icons/Enter'

export const BubbleItemWrapper = styled.div`
  /* width: 100%; */
  white-space: nowrap;
  span {
    margin-right: 1em;
  }
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
    <BubbleItemWrapper onClick={handleSelect}>
      {children}
      {isSelected && <EnterIcon />}
    </BubbleItemWrapper>
  )
}
