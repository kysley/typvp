import React, {FC, memo} from 'react'

import SingleWord from '@/styled/Word'

type WordProps = {
  variant: 'current' | 'done' | 'awaiting'
  word: string
  isMatch: boolean
}

const Word: FC<WordProps> = ({variant, word, isMatch}) => {
  return (
    <SingleWord isMatch={isMatch} variant={variant}>
      {word}
    </SingleWord>
  )
}

export default memo(Word)
