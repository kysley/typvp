import React, {FC} from 'react'
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
        position: 'fixed',
        bottom: '1vh',
        right: '1vw',
        width: '2em',
        cursor: 'pointer',
      }}
      onClick={GlobalStore.toggleTheme}
    />
  )
})

export default ThemeToggle
