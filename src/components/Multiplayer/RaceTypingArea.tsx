import React, {FC, useRef, useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import Word from '@/components/Word'
import {TypingAreaContainer, TypingAreaInner} from '@/styled/TypingArea'
import {SkeletonLine} from '@/styled/Skeleton'
import {Input} from '@/styled/TextInput'

const getWordType = (a: number, b: number) => {
  if (a < b) return 'done'
  if (a === b) return 'current'
  return 'awaiting'
}

interface ITypingArea {
  isGameOver: boolean
}

const RaceTypingArea: FC<ITypingArea> = observer(props => {
  const wordsRef = useRef<null | HTMLDivElement>(null)

  const {RaceStore} = useStore()

  useEffect(() => {
    if (wordsRef.current !== null && RaceStore.words.length > 0) {
      wordsRef.current!.children[RaceStore.wordIndex].scrollIntoView(true)
    }
  }, [RaceStore.wordIndex, RaceStore.words])

  return (
    <TypingAreaContainer>
      <TypingAreaInner
        ref={wordsRef}
        style={{height: '75px', overflow: 'hidden'}}
        disabled={props.isGameOver}
      >
        {RaceStore.words ? (
          // <SkeletonLine />
          <>
            {RaceStore.words.map((word: string, i: number) => (
              <Word
                isMatch={RaceStore.typedHistory[i] === RaceStore.words[i]}
                word={word}
                key={`${word}-${i}`}
                variant={getWordType(i, RaceStore.wordIndex)}
              />
            ))}
          </>
        ) : (
          'awaiting word list from server'
        )}
      </TypingAreaInner>
      <Input
        hasWarning={RaceStore.isSpellingIncorrect}
        disabled={props.isGameOver}
        placeholder="Start..."
        value={RaceStore.typedWord}
        onChange={e => RaceStore.onKeyDown(e)}
        onKeyDown={e => RaceStore.onAction(e)}
        aria-label="Text Input"
      />
    </TypingAreaContainer>
  )
})

export default RaceTypingArea
