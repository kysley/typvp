import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {useModal} from 'react-modal-hook'

import {TTrial} from '@/types/game'
import {
  TrialCard,
  TrialActions,
  TrialName,
  TrialDifficulty,
  TrialFold,
} from '@/styled/Trials'
import {TrashIcon} from '@/components/icons'
import InlineEditable from '@/components/InlineEditable'
import Popover from '@/components/Popover'

type TrialCardProps = {
  trial: TTrial
  updateTrial: (...args: any[]) => any
  deleteTrial: (...args: any[]) => any
}

const OwnedTrialCard: FC<TrialCardProps> = ({
  trial,
  updateTrial,
  deleteTrial,
}) => {
  const [showModal, closeModal] = useModal(() => (
    <Popover
      action="Delete"
      title="Delete Trial?"
      desc="Are you sure you want to delete this Trial?"
      onClose={closeModal}
      onConfirm={async () => {
        await deleteTrial({trialId: trial.id})
        closeModal()
      }}
    />
  ))
  return (
    <Link to={`trial/${trial.id}`}>
      <TrialCard difficulty={trial.difficulty}>
        <TrialActions>
          <div
            onClick={e => {
              e.preventDefault()
              showModal()
            }}
          >
            <TrashIcon />
          </div>
        </TrialActions>
        <TrialName>
          <InlineEditable
            currentValue={trial.name}
            onConfirm={name => {
              updateTrial({trialId: trial.id, name})
            }}
          />
        </TrialName>
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

export default OwnedTrialCard
