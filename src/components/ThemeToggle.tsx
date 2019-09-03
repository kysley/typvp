import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import styled from 'styled-components'

import {useStore} from '@/stores'

const Toggle = styled.svg`
  position: fixed;
  bottom: 1vh;
  right: 1vw;
  width: 2em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.accentText};
`

const ThemeToggle: FC = observer(() => {
  const {GlobalStore} = useStore()
  return (
    <Toggle viewBox="0 0 64 80" onClick={GlobalStore.toggleTheme}>
      <path d="M61 38H45.949C45.433 30.747 39.382 25 32 25s-13.433 5.747-13.949 13H3a1 1 0 0 0 0 2h15.051c.516 7.253 6.567 13 13.949 13s13.433-5.747 13.949-13H61a1 1 0 0 0 0-2zM32 27c6.279 0 11.438 4.851 11.949 11H20.051c.511-6.149 5.67-11 11.949-11zm0 24c-6.279 0-11.438-4.851-11.949-11h23.898c-.511 6.149-5.67 11-11.949 11zM33 20V10a1 1 0 0 0-2 0v10a1 1 0 0 0 2 0zM18.565 26.564a.999.999 0 0 0 .707-1.707l-4.243-4.242a.999.999 0 1 0-1.414 1.414l4.243 4.242a.993.993 0 0 0 .707.293zM46.142 26.271l4.243-4.242a.999.999 0 1 0-1.414-1.414l-4.243 4.242a.999.999 0 1 0 1.414 1.414z" />
    </Toggle>
  )
})

export default ThemeToggle
