import React, {useState, useEffect, useRef} from 'react'

import {DropdownWrapper} from '@/styled/Dropdown'

export const Dropdown = ({children, header}: any) => {
  const _dropdownNode = useRef<HTMLDivElement>()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleClickOutside = (e: any) => {
    const node = _dropdownNode.current
    if (node && node.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setMenuOpen(false)
  }

  const handleMenu = () => {
    if (!menuOpen) setMenuOpen(wasOpen => !wasOpen)
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <DropdownWrapper
      onClick={handleMenu}
      ref={_dropdownNode as any}
      isOpen={menuOpen}
    >
      {header}
      {menuOpen && <>{children}</>}
    </DropdownWrapper>
  )
}
