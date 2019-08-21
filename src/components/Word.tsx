import React from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import SingleWord from '@/styled/Word'

interface WordProps {
  index: number
  variant: 'current' | 'done' | 'awaiting'
  word: string
}

const Word = observer(({variant, index, word}: WordProps) => {
  const {GameStore} = useStore()

  return (
    <SingleWord
      isMatch={GameStore.typedHistory[index] === GameStore.words[index]}
      variant={variant}
    >
      {word}
    </SingleWord>
  )
})

export default Word
