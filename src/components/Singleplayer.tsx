import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {SingleplayerContainer} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'

const Singleplayer: FC = observer(() => {
  const {GameStore} = useStore()

  useEffect(() => {
    // 0 is falsy
    if (!GameStore.words.length) GameStore.generateWords()
    return () => {
      GameStore.reset()
    }
  }, [])

  return (
    <SingleplayerContainer>
      <SingleplayerMeta />
      <TypingArea />
      {GameStore.typingState === TypingState.Finished && (
        <SingleplayerResults />
      )}
    </SingleplayerContainer>
  )
})

export default Singleplayer
