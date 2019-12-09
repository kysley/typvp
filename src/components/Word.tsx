import React from 'react'

import SingleWord from '@/styled/Word'

type WordProps = {
  variant: 'current' | 'done' | 'awaiting'
  word: string
  isMatch: boolean
}

const Word = ({variant, word, isMatch}: WordProps) => {
  return (
    <SingleWord isMatch={isMatch} variant={variant}>
      {word}
    </SingleWord>
  )
}

export default Word
