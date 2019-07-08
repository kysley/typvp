import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import SoloGameMeta from '@/components/SoloGameMeta'
import TypingArea from '@/components/TypingArea'

const Singleplayer: FC = observer((props: any) => {
  const {GameStore} = useStore()

  useEffect(() => {
    GameStore.generateWords()
  }, [])

  return (
    <div style={{maxWidth: '750px', width: '90%', margin: '10px auto'}}>
      <SoloGameMeta />
      <TypingArea />
    </div>
  )
})

export default Singleplayer
