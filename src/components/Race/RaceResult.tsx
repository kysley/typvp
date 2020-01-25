import React, {FC, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import styled from 'styled-components'

import Button from '@/styled/Button'

type RaceResultProps = {
  raceOver: boolean
  playerId: string | number
  positions: any[]
}

const positionToString: any = {
  1: 'First',
  2: 'Second',
  3: 'Third',
  4: 'Fourth',
}

const ResultContainer = styled(motion.div)`
  display: flex;
  align-self: center;
  margin-top: 7vh;
  background: #efeff1;
  min-height: 25rem;
  min-width: 40rem;
  padding: 2em;
  border-radius: 6px;
  flex-direction: column;

  button {
    margin-top: auto;
    height: 45px;
    font-size: 0.95rem;
  }
`

const ResultHeader = styled.h1`
  text-align: center;
`

const RaceResult: FC<RaceResultProps> = ({raceOver, playerId, positions}) => {
  const [position, setPosition] = useState()
  useEffect(() => {
    const pos = positions.findIndex(player => player.id === playerId) + 1
    setPosition(positionToString[pos])
  }, [raceOver])
  console.log(positions)
  return (
    <AnimatePresence>
      {raceOver && (
        <ResultContainer
          animate={{opacity: [0, 1]}}
          transition={{delay: 1.5}}
          exit={{opacity: 0, transition: {delay: 1.5}}}
        >
          <ResultHeader>
            Congratulations! <br />
            You placed {position}!
          </ResultHeader>
          <ol>
            {positions.map((player: any, idx) => (
              <li
                style={{
                  color: player.color && player.color,
                  fontSize: `1.${6 - idx}rem`,
                }}
              >
                {player.name}
              </li>
            ))}
          </ol>
          <Button appearance="primary" intent="none">
            Back to Lobbies
          </Button>
        </ResultContainer>
      )}
    </AnimatePresence>
  )
}

export default RaceResult
