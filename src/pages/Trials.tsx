import React, {useState, useEffect} from 'react'
import {useQuery} from 'urql'

import TRIALS from '@/graphql/queries/trials'
import {TrialCard, TrialCardGrid} from '@/styled/Trials'

const Trials = () => {
  const [trials, setTrials] = useState([])
  const [result] = useQuery({
    query: TRIALS,
  })

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {trials},
      } = result
      setTrials(trials)
    }
  }, [result])

  return (
    <TrialCardGrid>
      {trials.map((t: any, idx) => (
        <TrialCard>
          <p>{t.name}</p>
          <p>{t.difficulty}</p>
          <p>{t.minWordLength}</p>
          <p>{t.maxWordLength}</p>
        </TrialCard>
      ))}
    </TrialCardGrid>
  )
}

export default Trials
