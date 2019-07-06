import React from 'react'

interface CharacterProps {
  children: string
  variant: 'red' | 'white' | 'black'
}

const Character = ({children, variant}: CharacterProps) => {
  let color = '#111'
  if (variant === 'red') color = '#ff0033'
  else if (variant === 'white') color = '#c2a'

  return <span style={{color: color}}>{children}</span>
}

export default Character
