import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation, useQuery} from 'urql'
import {Link, useParams} from 'react-router-dom'
import {useShortcuts} from 'react-shortcuts-hook'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {SingleplayerContainer} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import {ADD_RESULT_TO_TRIAL} from '@/graphql/mutations/addResult'
import {TRIAL} from '@/graphql/queries/trials'
import Button from '@/styled/Button'
import {TrialDifficulty, TrialMeta} from '@/styled/Trials'

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
  useShortcuts(['enter'], () => {
    GameStore.reset()
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
    <>
      {trial && (
        <SingleplayerContainer>
          <TrialMeta
            isVisible={GameStore.typingState !== TypingState.InProgress}
          >
            <Button as={Link} to="/trials" appearance="default" intent="none">
              Back to Trials
            </Button>
            <span>{trial.name}</span>
            <TrialDifficulty difficulty={trial.difficulty}>
              {trial.difficulty}
            </TrialDifficulty>
          </TrialMeta>
          <SingleplayerMeta />
          <TypingArea
            isGameOver={GameStore.typingState === TypingState.Finished}
          />
          <SingleplayerResults
            isVisible={GameStore.typingState === TypingState.Finished}
          />
        </SingleplayerContainer>
      )}
    </>
  )
})

export default Trial
