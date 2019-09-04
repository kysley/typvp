import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation, useQuery} from 'urql'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {TrialContainer} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import {ADD_RESULT_TO_TRIAL} from '@/graphql/mutations/addResult'
import {TRIAL} from '@/graphql/queries/trials'

const Trial: FC = observer(props => {
  const [trial, setTrial] = useState()
  const {GameStore, UserStore} = useStore()
  const [mutation, execMutation] = useMutation(ADD_RESULT_TO_TRIAL)
  const [result] = useQuery({
    query: TRIAL,
    variables: {
      trialId: props.match.params.id,
    },
  })

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {trial},
      } = result
      setTrial(trial)
      GameStore.loadWordSet(trial.wordSet)
    }
  }, [result])

  useEffect(() => {
    GameStore.mode = 'Trial'
    return () => {
      GameStore.mode = undefined
      GameStore.reset()
    }
  }, [])

  return (
    <TrialContainer>
      {trial && (
        <>
          <h1>{trial.name}</h1>
          <h2>{trial.difficulty}</h2>
          <SingleplayerMeta />
          <TypingArea
            isGameOver={GameStore.typingState === TypingState.Finished}
          />
          {GameStore.typingState === TypingState.Finished && (
            <SingleplayerResults />
          )}
        </>
      )}
    </TrialContainer>
  )
})

export default Trial
