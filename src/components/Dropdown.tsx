import React, {useState, useEffect, FC} from 'react'

import {DropdownWrapper} from '@/styled/Dropdown'

export const Dropdown: FC<{header: string}> = ({children, header}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClickOutside = (e: any) => {
    e.preventDefault()
    setMenuOpen(false)
  }

  const handleMenu = () => {
    setMenuOpen(wasOpen => !wasOpen)
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <DropdownWrapper onClick={handleMenu} isOpen={menuOpen}>
      {header}
      {menuOpen && <>{children}</>}
    </DropdownWrapper>
  )
}
