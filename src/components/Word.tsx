import * as React from 'react'
import styled from 'styled-components'

import Character from '@/components/Character'

const WordC = styled.span`
  font-size: 26;
  margin-bottom: 4px;
  padding: 4px 5px;
  border-radius: 5;
  display: inline-block;
`

interface WordProps {
  expected: string
  actual: string
  variant: 'current' | 'done' | 'awaiting'
}

const getVariant = (expected: string, actual: string, i: number) => {
  if (actual === undefined || actual.length - 1 < i) return 'black'
  return expected[i] === actual[i] ? 'white' : 'red'
}

const Word = ({expected, actual, variant}: WordProps) => {
  const isMatch = expected === actual

  console.log(expected === actual)

  let styleObject: any = {color: '#162020'}
  if (variant === 'done') styleObject = {color: isMatch ? '#1c54ff' : '#f20434'}
  else if (variant === 'current') styleObject.background = '#3bd376'

  return (
    <WordC style={{...styleObject}}>
      {variant !== 'current'
        ? expected
        : expected.split('').map((c, i) => (
            <Character key={i} variant={getVariant(expected, actual, i)}>
              {c}
            </Character>
          ))}
    </WordC>
  )
}

export default Word
