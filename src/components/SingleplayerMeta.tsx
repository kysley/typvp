import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import {TypingState} from '@/types/game'
import {MetaContainer, MetaTimer} from '@/styled/Singleplayer'

const SingleplayerMeta: FC = observer(() => {
  const [percent, setPercent] = useState<number>(100)

  const {GameStore} = useStore()

  useEffect(() => {
    const newPercent = (GameStore.time / 60) * 100
    setPercent(newPercent)
  }, [GameStore.time])

  return (
    <MetaContainer>
      <MetaTimer style={{width: `${percent}%`}} />
      <span>
        Time Left:{' '}
        {GameStore.typingState === TypingState.AwaitingLastWord
          ? 'finish word'
          : `${60 - GameStore.time}s`}
      </span>
      <span>
        CPM:{' '}
        {GameStore.cpm === Infinity || isNaN(GameStore.cpm)
          ? '?'
          : GameStore.cpm}
      </span>
    </MetaContainer>
  )
})

export default SingleplayerMeta
