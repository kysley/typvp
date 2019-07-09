import React, {FC, useRef} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import Word from '@/components/Word'
import {TypingAreaContainer, TypingAreaInner} from '@/styled/TypingArea'
import {Input} from '@/styled/TextInput'

const getWordType = (a: number, b: number) => {
  if (a < b) return 'done'
  if (a === b) return 'current'
  return 'awaiting'
}

const TypingArea: FC = observer(props => {
  const wordsRef = useRef(null)

  const {GameStore} = useStore()

  return (
    <TypingAreaContainer>
      <TypingAreaInner
        ref={wordsRef}
        style={{height: '150px', overflow: 'hidden'}}
      >
        {GameStore.words.length > 0 &&
          GameStore.words.map((word: string, i: number) => (
            <Word
              word={word}
              index={i}
              key={`${word}-${i}`}
              variant={getWordType(i, GameStore.wordIndex)}
            />
          ))}
      </TypingAreaInner>
      <Input
        placeholder="Start..."
        value={GameStore.typedWord}
        onChange={e => GameStore.onKeyDown(e)}
        onKeyDown={e => GameStore.onAction(e)}
      />
    </TypingAreaContainer>
  )
})

export default TypingArea
