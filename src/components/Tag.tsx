import React, {FC} from 'react'
import styled from 'styled-components'

import {TagColors} from '@/styled/Theme'

const TagWrapper = styled.div<{color: keyof typeof TagColors}>`
  border-radius: 4px;
  background-color: ${({color}) => `${TagColors[color]}`};
  padding: 0.25em;
  width: fit-content;
`

type TagProps = {
  text: string
  color: keyof typeof TagColors
}

const Tag: FC<TagProps> = ({text, color = 'blue'}) => {
  return (
    <TagWrapper color={color}>
      <span>{text}</span>
    </TagWrapper>
  )
}

export default Tag
