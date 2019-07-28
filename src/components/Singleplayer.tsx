import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation} from 'urql'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {SingleplayerContainer} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import ADD_RESULT from '@/graphql/mutations/addResult'

const Singleplayer: FC = observer(() => {
  const {GameStore, UserStore} = useStore()
  const [mutation, execMutation] = useMutation(ADD_RESULT)

  useEffect(() => {
    // 0 is falsy
    if (!GameStore.words.length) GameStore.generateWords()
    return () => {
      GameStore.reset()
    }
  }, [])

  useEffect(() => {
    if (GameStore.typingState === TypingState.Finished && UserStore.me) {
      const {cpm, rawCpm, wpm, correct, incorrect, corrections} = GameStore
      execMutation({
        cpm,
        rawCpm,
        wpm,
        correct,
        incorrect,
        corrections,
      })
    }
  }, [GameStore.typingState])

  return (
    <SingleplayerContainer>
      <SingleplayerMeta />
      <TypingArea isGameOver={GameStore.typingState === TypingState.Finished} />
      {GameStore.typingState === TypingState.Finished && (
        <SingleplayerResults />
      )}
    </SingleplayerContainer>
  )
})

export default Singleplayer
