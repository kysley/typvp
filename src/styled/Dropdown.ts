import styled from 'styled-components'

import {bundle} from '@/styled/Theme'

interface ItemProps {
  intent: 'none' | 'success' | 'warning' | 'danger'
}

export const DropdownMenu = styled.div`
  width: 100%;
  min-width: 150px;
  top: 100%;
  position: absolute;
  padding: 8px;
  margin-top: 3px;
  right: 0;
  z-index: 4;
  background: ${({theme}) => theme.backgrounds.accent};
  user-select: none;
  border-radius: 4px;
  color: ${({theme}) => theme.colors.text};
`

export const DropdownWrapper = styled.div`
  position: relative;
  width: auto;
  min-height: 34px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
  user-select: none;
  background: ${({theme}) => theme.backgrounds.accent};
  border-radius: 4px;
  color: ${({theme}) => theme.colors.text};
`

export const DropdownItems = styled.ul`
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-top: none;
  border-radius: 4px;
  font-size: 14px;
`

export const DropdownItem = styled.li<ItemProps>`
  width: 100%;
  display: block;
  line-height: normal;
  list-style: none;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${({intent = 'none'}) =>
    intent !== 'none' &&
    `
      color: ${bundle.primary[intent].bg};
    `}

  &:hover {
    background-color: ${({theme}) => theme.backgrounds.background};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const DropdownBorder = styled.div`
  border-top: 1px solid ${({theme}) => theme.backgrounds.background};
  margin-top: 0.5em;
`
