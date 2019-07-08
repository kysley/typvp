import React, {FC} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import {TypingState} from '@/types/game'

const SoloGameMeta: FC = observer((props: any) => {
  const {GameStore} = useStore()

  return (
    <>
      <div>
        Time Left:{' '}
        {GameStore.typingState === TypingState.AwaitingLastWord
          ? 'finish word'
          : `${GameStore.time}s`}
      </div>
      <div style={{marginLeft: 20}}>
        CPM:{' '}
        {GameStore.cpm === Infinity || isNaN(GameStore.cpm)
          ? '?'
          : GameStore.cpm}
      </div>
    </>
  )
})

export default SoloGameMeta
