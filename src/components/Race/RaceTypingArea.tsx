import React, {FC, useRef, useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import Word from '@/components/Word'
import {TypingAreaContainer, TypingAreaInner} from '@/styled/TypingArea'
import {Input} from '@/styled/TextInput'
import {SkeletonLine} from '@/styled/Skeleton'

const getWordType = (a: number, b: number) => {
  if (a < b) return 'done'
  if (a === b) return 'current'
  return 'awaiting'
}

type TTypingArea = {
  canType: boolean
}

const RaceTypingArea: FC<TTypingArea> = observer(({canType}) => {
  const wordsRef = useRef<null | HTMLDivElement>(null)
  const inputRef = useRef<null | HTMLInputElement>(null)

  const {RaceStore} = useStore()

  useEffect(() => {
    if (wordsRef.current !== null && RaceStore.words.length > 0) {
      wordsRef.current!.children[RaceStore.wordIndex].scrollIntoView(true)
    }
  }, [RaceStore.wordIndex, RaceStore.words])

  useEffect(() => {
    if (canType) {
      inputRef.current!.focus()
    }
  }, [canType])

  return (
    <TypingAreaContainer>
      <TypingAreaInner
        ref={wordsRef}
        style={{height: '80px', overflow: 'hidden'}}
        disabled={!canType}
      >
        {RaceStore.words.length ? (
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
          // 'awaiting word list from server'
          <SkeletonLine />
        )}
      </TypingAreaInner>
      <Input
        ref={inputRef}
        hasWarning={RaceStore.isSpellingIncorrect}
        disabled={!canType}
        value={RaceStore.typedWord}
        onChange={e => RaceStore.onKeyDown(e)}
        onKeyDown={e => RaceStore.onAction(e)}
        aria-label="Text Input"
        autoFocus={true}
      />
    </TypingAreaContainer>
  )
})

export default RaceTypingArea
