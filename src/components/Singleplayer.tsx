import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import {SingleplayerContainer} from '@/styled/Singleplayer'

const Singleplayer: FC = observer((props: any) => {
  const {GameStore} = useStore()

  useEffect(() => {
    GameStore.generateWords()
  }, [])

  return (
    <SingleplayerContainer>
      <SingleplayerMeta />
      <TypingArea />
    </SingleplayerContainer>
  )
})

export default Singleplayer
