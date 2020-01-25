import styled, {css} from 'styled-components'

import {colors} from '@/styled/Theme'

interface IPageButton {
  selected?: boolean
}

export const PageButton = styled.p<IPageButton>`
  display: inline-flex;
  font-weight: 400;
  padding: 0.5em;
  margin: 0.35em;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({theme}) => theme.colors.text};
  cursor: pointer;

  :hover {
    background: ${({theme}) => theme.backgrounds.hover};
  }
  ${({selected}) =>
    selected &&
    css`
      border: 2px solid ${colors.b300};
      :hover {
        background: ${colors.b300};
      }
    `}
`

export const TabList = styled.ul`
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.backgrounds.secondary};
  border-radius: 4px;
  width: 100%;
  margin: 0;
  list-style: none;
  user-select: none;
  padding: 0;
  justify-content: center;
`

export const TabContainer = styled.nav`
  width: 100%;
`
