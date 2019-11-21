import React, {FC, useState, SyntheticEvent, useEffect} from 'react'

import {BubbleItem} from './BubbleItem'

import {DropdownWrapper, DropdownMenu, DropdownItems} from '@/styled/Dropdown'

interface IBubble {
  values: {name: string; value: string}[]
  defaultValue?: string
  callback: (...args: any[]) => any
}

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
    setSelected(opt.value)
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
    <DropdownWrapper isOpen={open} onClick={toggleMenu}>
      <span>{selected}</span>
      {open && (
        <DropdownMenu>
          <DropdownItems>
            {values.map(opt => (
              <BubbleItem
                handleSelect={() => handleItemSelect(opt)}
                key={opt.value}
                isSelected={selected === opt.name}
              >
                <span>{opt.name}</span>
              </BubbleItem>
            ))}
          </DropdownItems>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  )
}
