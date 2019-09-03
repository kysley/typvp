import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from 'urql'

import TRIALS from '@/graphql/queries/trials'
import {
  TrialCard,
  TrialCardGrid,
  TrialName,
  TrialDifficulty,
  TrialFold,
} from '@/styled/Trials'

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
      {trials.map((t: any) => (
        <Link to={`trials/${t.id}`} key={t.id}>
          <TrialCard difficulty={t.difficulty}>
            <TrialName>{t.name}</TrialName>
            <TrialDifficulty difficulty={t.difficulty}>
              {t.difficulty}
            </TrialDifficulty>
            <TrialFold>
              <p>min length: {t.minWordLength}</p>
              <p>max length: {t.maxWordLength}</p>
            </TrialFold>
          </TrialCard>
        </Link>
      ))}
    </TrialCardGrid>
  )
}

export default Trials
