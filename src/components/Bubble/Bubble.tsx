import React, {FC, useState, SyntheticEvent, useEffect} from 'react'
import styled from 'styled-components'

import {BubbleItem} from '@/components/Bubble/BubbleItem'

interface IBubble {
  values: {name: string; value: string}[]
  defaultValue?: string
  callback: (...args: any[]) => any
}

const BubbleWrapper = styled.div<any>`
  position: relative;
  width: auto;
  min-height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: ${({theme}) => theme.backgrounds.secondary};
  border-radius: 4px;
  color: ${({theme}) => theme.colors.text};

  &:hover {
    background: ${({theme}) => theme.backgrounds.hover};
  }

  ${({isOpen, theme}) =>
    isOpen &&
    `
      background: ${theme.backgrounds.active} !important;
    `}
`

const BubbleItems = styled.ul`
  min-width: 150px;
  top: 100%;
  position: absolute;
  padding: 8px;
  margin-top: 3px;
  left: 0;
  z-index: 4;
  background: ${({theme}) => theme.backgrounds.secondary};
  user-select: none;
  border-radius: 4px;
  color: ${({theme}) => theme.colors.text};
`

export const Bubble: FC<IBubble> = ({values, defaultValue, callback}) => {
  const [selected, setSelected] = useState(defaultValue || values[0].name)
  const [open, setOpen] = useState(false)

  const toggleMenu = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOpen(wasOpen => !wasOpen)
  }

  const handleClickOutside = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  const handleItemSelect = (opt: any) => {
    console.log(opt)
    setSelected(opt.name)
    callback(opt)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  return (
    <BubbleWrapper isOpen={open} onClick={toggleMenu}>
      <span>{selected}</span>
      {open && (
        <BubbleItems>
          {values.map(opt => (
            <BubbleItem
              handleSelect={() => handleItemSelect(opt)}
              key={opt.value}
              isSelected={selected === opt.name}
            >
              <span>{opt.name}</span>
            </BubbleItem>
          ))}
        </BubbleItems>
      )}
    </BubbleWrapper>
  )
}
