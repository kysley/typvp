import React, {FC, useRef} from 'react'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'
import Word from '@/components/Word'

const getWordType = (a: number, b: number) => {
  if (a < b) return 'done'
  if (a === b) return 'current'
  return 'awaiting'
}

const TypingArea: FC = observer(props => {
  const wordsRef = useRef(null)

  const {GameStore} = useStore()

  return (
    <div style={{padding: '35px 15px'}}>
      <div ref={wordsRef} style={{height: '150px', overflow: 'hidden'}}>
        {GameStore.words.length > 0 &&
          GameStore.words.map((word: string, i: number) => (
            <Word
              word={word}
              index={i}
              key={`${word}-${i}`}
              variant={getWordType(i, GameStore.wordIndex)}
            />
          ))}
      </div>
      <div style={{padding: '0px'}}>
        <input
          placeholder="Start..."
          value={GameStore.typedWord}
          onChange={e => GameStore.onKeyDown(e)}
          onKeyDown={e => {
            if (e.key === ' ') GameStore.testWord(e)
          }}
        />
      </div>
    </div>
  )
})

export default TypingArea
