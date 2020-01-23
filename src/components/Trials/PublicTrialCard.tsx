import React, {FC} from 'react'
import {Link} from 'react-router-dom'

import {TTrial} from '@/types/game'
import {TrialCard, TrialName, TrialDifficulty, TrialFold} from '@/styled/Trials'

type TrialCardProps = {
  trial: TTrial
}

const PublicTrialCard: FC<TrialCardProps> = ({trial}) => {
  return (
    <Link to={`trial/${trial.id}`}>
      <TrialCard difficulty={trial.difficulty}>
        <TrialName>{trial.name}</TrialName>
        <TrialDifficulty difficulty={trial.difficulty}>
          {trial.difficulty}
        </TrialDifficulty>
        <TrialFold>
          <p>min length: {trial.minWordLength}</p>
          <p>max length: {trial.maxWordLength}</p>
        </TrialFold>
      </TrialCard>
    </Link>
  )
}

export default PublicTrialCard
