import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation, useQuery} from 'urql'
import {Link, useParams} from 'react-router-dom'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {TrialContainer, TrialInfo} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import {ADD_RESULT_TO_TRIAL} from '@/graphql/mutations/addResult'
import {TRIAL} from '@/graphql/queries/trials'
import Button from '@/styled/Button'

const Trial: FC = observer(() => {
  const {id} = useParams()
  const [trial, setTrial] = useState()
  const {GameStore, UserStore} = useStore()
  const [mutation, execMutation] = useMutation(ADD_RESULT_TO_TRIAL)
  const [result] = useQuery({
    query: TRIAL,
    variables: {
      trialId: id,
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
        trialId: id,
        cpm,
        rawCpm,
        wpm,
        correct,
        incorrect,
        corrections,
        wordIndex,
      })
    }
  }, [GameStore.typingState])

  return (
    <TrialContainer>
      {trial && (
        <>
          <TrialInfo
            isHidden={
              GameStore.typingState ===
              (TypingState.InProgress || TypingState.AwaitingLastWord)
            }
          >
            <Button as={Link} to="/trials" appearance="secondary" intent="none">
              Back to Trials
            </Button>
            <h1>{trial.name}</h1>
            <h2>{trial.difficulty}</h2>
          </TrialInfo>
          <SingleplayerMeta />
          <TypingArea
            isGameOver={GameStore.typingState === TypingState.Finished}
          />
          <SingleplayerResults
            isVisible={GameStore.typingState === TypingState.Finished}
          />
        </>
      )}
    </TrialContainer>
  )
})

export default Trial
