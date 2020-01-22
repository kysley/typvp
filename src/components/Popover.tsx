import React, {FC} from 'react'
import styled from 'styled-components'

import Button from '@/styled/Button'

type PopoverProps = {
  isActive?: boolean
  desc?: string
  title: string
  onClose: any
  onConfirm: any
  action: string
}

const PopoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopoverWrapper = styled.div`
  position: relative;
  padding: 1em;
  height: auto;
  min-width: 330px;
  background: ${({theme}) => theme.backgrounds.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: ${({theme}) => theme.colors.text};
`

const PopoverTitle = styled.h1`
  grid-column: 1 / span 2;
  margin: 0 0 0.5em 0;

  :not(:last-child()) {
    margin: 0 0 1em 0;
  }
`

const PopoverDesc = styled.span`
  grid-column: 1 / span 2;
  margin: 0 0 1em 0;
`

const Popover: FC<PopoverProps> = ({
  isActive,
  title,
  onClose,
  onConfirm,
  desc,
  action,
}) => {
  return (
    <PopoverContainer>
      <PopoverWrapper>
        <PopoverTitle>{title}</PopoverTitle>
        <PopoverDesc>{desc}</PopoverDesc>
        <Button intent="none" appearance="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button intent="danger" appearance="primary" onClick={onConfirm}>
          {action || 'Ok'}
        </Button>
      </PopoverWrapper>
    </PopoverContainer>
  )
}

export default Popover
