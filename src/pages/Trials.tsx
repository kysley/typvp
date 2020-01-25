import React, {useState, useEffect} from 'react'
import {useQuery, useMutation} from 'urql'
import {observer} from 'mobx-react-lite'

import {TrialCardGrid, TrialSplitter} from '@/styled/Trials'
import {PageHeader} from '@/styled/Theme'
import {TRIALS, MY_TRIALS} from '@/graphql/queries'
import {SkeletonLine} from '@/styled/Skeleton'
import {useStore} from '@/stores'
import {UPDATE_TRIAL_INFO, DELETE_TRIAL} from '@/graphql/mutations'
import {OwnedTrialCard, PublicTrialCard} from '@/components/Trials'

const Trials = observer(() => {
  const {UserStore} = useStore()
  const [ready, setReady] = useState(false)

  const [trialsResult] = useQuery({
    query: TRIALS,
  })

  const [myTrialsResult] = useQuery({
    query: MY_TRIALS,
    pause: !ready,
    requestPolicy: 'cache-and-network',
  })

  const [mutation, execUpdateTrial] = useMutation(UPDATE_TRIAL_INFO)
  const [mutation2, execDeleteTrial] = useMutation(DELETE_TRIAL)

  useEffect(() => {
    if (UserStore.me) {
      setReady(true)
    }
  }, [UserStore.me])

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
              <PublicTrialCard key={t.id} trial={t} />
            ))}
          </>
        )}
      </TrialCardGrid>
      {UserStore.me && (
        <>
          <TrialSplitter>Your Trials</TrialSplitter>
          {myTrialsResult.fetching ? (
            <TrialCardGrid>
              {['1', '2', '3'].map((item: string) => (
                <SkeletonLine key={item} style={{height: '140px'}} />
              ))}
            </TrialCardGrid>
          ) : (
            <>
              {myTrialsResult.data && myTrialsResult.data.myTrials.length ? (
                <TrialCardGrid>
                  {myTrialsResult.data.myTrials.map((t: any) => (
                    <OwnedTrialCard
                      key={t.id}
                      trial={t}
                      updateTrial={execUpdateTrial}
                      deleteTrial={execDeleteTrial}
                    />
                  ))}
                </TrialCardGrid>
              ) : (
                <span>
                  It doesn't look like you have any Personal Trials saved yet.
                </span>
              )}
            </>
          )}
        </>
      )}
    </>
  )
})

export default Trials
