import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation} from 'urql'
import {useShortcuts} from 'react-shortcuts-hook'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {SingleplayerContainer} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import {CREATE_NEW_RESULT} from '@/graphql/mutations'
import {MutationCreateNewResultArgs} from '@/generated/graphql'

const Singleplayer: FC = observer(() => {
  const {GameStore, UserStore} = useStore()
  const [, execMutation] = useMutation(CREATE_NEW_RESULT)
  useShortcuts(['enter'], () => {
    GameStore.reset()
  })

  useEffect(() => {
    GameStore.mode = 'Singleplayer'
    GameStore.generateWords()
    return () => {
      GameStore.empty()
    }
  }, [])

  useEffect(() => {
    if (GameStore.typingState === TypingState.Finished && UserStore.me) {
      const {
        cpm,
        rawCpm,
        wpm,
        correct,
        incorrect,
        corrections,
        wordIndex,
      } = GameStore
      execMutation({
        data: {
          cpm,
          rawCpm,
          wpm,
          correct,
          incorrect,
          corrections,
          wordIndex,
        },
      } as MutationCreateNewResultArgs)
    }
  }, [GameStore.typingState])

  return (
    <SingleplayerContainer>
      <SingleplayerMeta color={UserStore.me && UserStore.me.color} />
      <TypingArea isGameOver={GameStore.typingState === TypingState.Finished} />
      <SingleplayerResults
        isVisible={GameStore.typingState === TypingState.Finished}
      />
    </SingleplayerContainer>
  )
})

export default Singleplayer
