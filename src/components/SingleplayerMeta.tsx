import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import {TypingState} from '@/types/game'
import {MetaContainer, MetaTimer} from '@/styled/Singleplayer'
import Button from '@/styled/Button'

const SingleplayerMeta: FC = observer(() => {
  const [percent, setPercent] = useState<number>(100)

  const {GameStore} = useStore()

  useEffect(() => {
    const newPercent = (60 - GameStore.time) / 60
    setPercent(newPercent)
  }, [GameStore.time])

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
        <Button appearance="link" intent="none" onClick={GameStore.reset}>
          reset
        </Button>
      </MetaContainer>
    </>
  )
})

export default SingleplayerMeta
