import React, {useState, useEffect} from 'react'

import {DropdownWrapper} from '@/styled/Dropdown'

export const Dropdown = ({children, header}: any) => {
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
