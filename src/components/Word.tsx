import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {observer} from 'mobx-react'

import {useStore} from '@/stores'

const finishedMatch = css`
  color: #1c54ff;
`

const finishedIncorrect = css`
  color: #f20434;
`

const current = css`
  background: #3bd376;
`

const WordC = styled.span`
  font-size: 26px;
  margin-bottom: 4px;
  padding: 4px 5px;
  border-radius: 5px;
  display: inline-block;
  color: #162020;

  ${p => {
    if (p.variant === 'done') {
      return p.isMatch ? `${finishedMatch}` : `${finishedIncorrect}`
    }
  }}
  ${p => (p.variant === 'current' ? `${current}` : null)}
`

interface WordProps {
  index: number
  variant: 'current' | 'done' | 'awaiting'
}

const Word = observer(({variant, index}: WordProps) => {
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
    <WordC isMatch={isMatch} variant={variant}>
      {GameStore.words[index]}
    </WordC>
  )
})

export default Word
