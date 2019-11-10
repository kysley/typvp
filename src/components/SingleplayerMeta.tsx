import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import {TypingState} from '@/types/game'
import {MetaContainer, MetaTimer} from '@/styled/Singleplayer'
import {RefreshIcon} from '@/components/icons/Refresh'

const SingleplayerMeta: FC = observer(() => {
  const [percent, setPercent] = useState<number>(100)
  const [spin, setSpin] = useState(false)

  const {GameStore} = useStore()

  useEffect(() => {
    const newPercent = (60 - GameStore.time) / 60
    setPercent(newPercent)
  }, [GameStore.time])

  const handleRefreshClick = () => {
    setSpin(true)
    GameStore.reset()
    setTimeout(() => {
      setSpin(false)
    }, 800)
  }

  return (
    <>
      <MetaContainer>
        <MetaTimer style={{width: `${percent * 100}%`}} />
        <span>
          Time Left:{' '}
          {GameStore.typingState === TypingState.AwaitingLastWord
            ? 'finish word'
            : `${60 - GameStore.time}s`}
        </span>
        <div
          onClick={() => {
            handleRefreshClick()
          }}
        >
          <RefreshIcon isSpinning={spin} />
        </div>
      </MetaContainer>
    </>
  )
})

export default SingleplayerMeta
