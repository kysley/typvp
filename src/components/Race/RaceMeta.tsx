import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import {MetaContainer, MetaTimer} from '@/styled/Singleplayer'
import {colors} from '@/styled/Theme'

const colorCountdownMap: any = {
  5: colors.r300,
  4: colors.y300,
  3: colors.y200,
  2: colors.y100,
  1: colors.g300,
  0: '',
}

const RaceMeta: FC = observer(() => {
  const {RaceStore} = useStore()

  return (
    <>
      <MetaContainer
        style={{
          backgroundColor: `${colorCountdownMap[RaceStore.room!.countdown]}`,
        }}
      >
        <MetaTimer
          style={{width: `${(RaceStore.room!.secondsRemaining / 60) * 100}%`}}
        />
        {RaceStore.room!.state === 'starting' ? (
          <span>Starting In... {RaceStore.room!.countdown}</span>
        ) : (
          <span>
            Time Left:{' '}
            {RaceStore.room!.state === 'finished'
              ? 'Completed'
              : `${RaceStore.room!.secondsRemaining}s`}
          </span>
        )}
      </MetaContainer>
    </>
  )
})

export default RaceMeta
