import React, {FC, useState} from 'react'
import styled from 'styled-components'

// import Arrow from './components/Arrow'
// import Tooltip from './components/Tooltip'
// import Bubble from './components/Bubble'

type TooltipProps = {
  placement: 'top' | 'bottom' | 'left' | 'right'
  text: string
}

const Tooltip = styled.div<{show: boolean}>`
  position: fixed;
  /* top: 50%; */
  right: -10%;
  display: ${({show}) => (show ? 'block' : 'none')};
  background: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
`

const TooltipWrapper: FC<TooltipProps> = ({
  children,
  placement = 'right',
  text,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{position: 'relative'}}
    >
      {children}
      <Tooltip show={isOpen}>{text}</Tooltip>
    </div>
  )
}

export default TooltipWrapper
