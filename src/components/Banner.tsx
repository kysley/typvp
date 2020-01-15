import React, {FC, useState} from 'react'
import styled from 'styled-components'

import {intentMeta} from '@/styled/Theme'

const BannerWrapper = styled.div<{intent: string}>`
  width: 100%;
  padding: 1em;
  background-color: ${({theme}) => theme.backgrounds.secondary};
  border-radius: 4px;
  margin-bottom: 1em;
  color: ${({theme}) => theme.colors.text};
  overflow: hidden;
  position: relative;

  &::before {
    display: block;
    content: '';
    height: 100%;
    width: 3px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({intent}: any) => intentMeta[intent].bg};
  }

  h4 {
    color: ${({intent}: any) => intentMeta[intent].bg};
  }
`

const BannerTitle = styled.h4`
  font-size: 1.25rem;
  margin: 0;
`

const BannerMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
`

type BannerProps = {
  title: string
  message?: string
  closeable?: boolean
  intent?: 'none' | 'success' | 'warning' | 'danger'
}

export const Banner: FC<BannerProps> = ({
  title,
  message,
  closeable = false,
  intent = 'none',
}) => {
  const [open, setOpen] = useState(true)
  return (
    <BannerWrapper intent={intent}>
      <BannerTitle>{title}</BannerTitle>
      {message && <BannerMessage>{message}</BannerMessage>}
    </BannerWrapper>
  )
}
