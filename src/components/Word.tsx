import React, {useState, useEffect} from 'react'
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
  const [isMatch, setMatch] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    if (GameStore.typedHistory[index] === GameStore.words[index]) {
      setMatch(true)
    } else {
      setMatch(false)
    }
  }, [variant])

  return (
    <SingleWord isMatch={isMatch} variant={variant}>
      {word}
    </SingleWord>
  )
})

export default Word
