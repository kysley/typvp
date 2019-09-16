import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useMutation, useQuery} from 'urql'
import {Link} from 'react-router-dom'

import {useStore} from '@/stores'
import SingleplayerMeta from '@/components/SingleplayerMeta'
import TypingArea from '@/components/TypingArea'
import SingleplayerResults from '@/components/SingleplayerResults'
import {TrialContainer, TrialInfo} from '@/styled/Singleplayer'
import {TypingState} from '@/types/game'
import {ADD_RESULT_TO_TRIAL} from '@/graphql/mutations/addResult'
import {TRIAL} from '@/graphql/queries/trials'
import Button from '@/styled/Button'

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
          <TrialInfo
            isHidden={
              GameStore.typingState ===
              (TypingState.InProgress || TypingState.AwaitingLastWord)
            }
          >
            <Link to="/trials">
              <Button appearance="secondary" intent="none">
                Back to Trials
              </Button>
            </Link>
            <h1>{trial.name}</h1>
            <h2>{trial.difficulty}</h2>
          </TrialInfo>
          <SingleplayerMeta />
          <TypingArea
            isGameOver={GameStore.typingState === TypingState.Finished}
          />
          <SingleplayerResults
            isVisible={GameStore.typingState === TypingState.InProgress}
          />
        </>
      )}
    </TrialContainer>
  )
})

export default Trial
