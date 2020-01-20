import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from 'urql'
import {observer} from 'mobx-react-lite'
import {useModal} from 'react-modal-hook'

import {
  TrialCard,
  TrialCardGrid,
  TrialName,
  TrialDifficulty,
  TrialFold,
  TrialSplitter,
  TrialActions,
} from '@/styled/Trials'
import {PageHeader} from '@/styled/Theme'
import {TRIALS, MY_TRIALS} from '@/graphql/queries'
import {SkeletonLine} from '@/styled/Skeleton'
import {useStore} from '@/stores'
import InlineEditable from '@/components/InlineEditable'
import {TrashIcon} from '@/components/icons'
import Popover from '@/components/Popover'

const Trials = observer(() => {
  const {UserStore} = useStore()
  const [ready, setReady] = useState(false)
  const [showModal, closeModal] = useModal(() => (
    <Popover
      action="Delete"
      title="Delete Trial?"
      desc="Are you sure you want to delete this Trial?"
      onClose={closeModal}
      onConfirm={() => {
        console.log('yay')
      }}
    />
  ))

  const [trialsResult] = useQuery({
    query: TRIALS,
  })

  const [myTrialsResult] = useQuery({
    query: MY_TRIALS,
    pause: !ready,
  })

  useEffect(() => {
    if (UserStore.me) {
      setReady(true)
    }
  }, [UserStore.me])

  const cb = e => {
    e.preventDefault()
    console.log('asd')
  }

  return (
    <>
      <PageHeader>Trials</PageHeader>
      <TrialCardGrid>
        {trialsResult.fetching ? (
          <>
            {['1', '2', '3', '4'].map((item: string) => (
              <SkeletonLine key={item} style={{height: '140px'}} />
            ))}
          </>
        ) : (
          <>
            {trialsResult.data.trials.map((t: any) => (
              <Link to={`trial/${t.id}`} key={t.id}>
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
          </>
        )}
      </TrialCardGrid>
      {UserStore.me && (
        <>
          <TrialSplitter>Your Trials</TrialSplitter>
          <TrialCardGrid>
            {myTrialsResult.fetching ? (
              <>
                {['1', '2', '3'].map((item: string) => (
                  <SkeletonLine key={item} style={{height: '140px'}} />
                ))}
              </>
            ) : (
              <>
                {myTrialsResult.data &&
                  myTrialsResult.data.myTrials.map((t: any) => (
                    <Link to={`trial/${t.id}`} key={t.id}>
                      <TrialCard difficulty={t.difficulty}>
                        <TrialActions>
                          <div
                            onClick={e => {
                              showModal()
                              e.preventDefault()
                            }}
                          >
                            <TrashIcon />
                          </div>
                        </TrialActions>
                        {/* <TrialName>{t.name}</TrialName> */}
                        <TrialName>
                          <InlineEditable
                            currentValue={t.name}
                            onConfirm={cb}
                          />
                        </TrialName>
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
              </>
            )}
          </TrialCardGrid>
        </>
      )}
    </>
  )
})

export default Trials
