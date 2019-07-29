import React, {FC, useState} from 'react'
import {observer} from 'mobx-react-lite'

import sunmoon from '@/assets/images/sunmoon.svg'
import {useStore} from '@/stores'

const ThemeToggle: FC = observer(() => {
  const {GlobalStore} = useStore()
  return (
    <img
      alt="nopthing"
      src={sunmoon}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '2em',
        cursor: 'pointer',
      }}
      onClick={() => GlobalStore.toggleTheme()}
    />
  )
})

export default ThemeToggle
