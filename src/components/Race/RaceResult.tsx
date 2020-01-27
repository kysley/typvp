import React, {FC, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import Button from '@/styled/Button'
import {useStore} from '@/stores'
import {ResultsHeader, ResultsNumber} from '@/styled/Singleplayer'
import {colors} from '@/styled/Theme'

type RaceResultProps = {
  raceOver: boolean
  playerId: string | number
  playerColor: string | undefined
  positions: any[]
}

const positionToObj: any = {
  1: {
    name: 'First',
    tag: 'Winner Winner!',
  },
  2: {
    name: 'Second',
    tag: 'justonemorejustonemore',
  },
  3: {
    name: 'Third',
    tag: 'So close!',
  },
  4: {
    name: 'Fourth',
    tag: 'Go. Again. SUPER. HOT.',
  },
}

const ResultContainer = styled(motion.div)`
  display: flex;
  align-self: center;
  margin-top: 7vh;
  background: ${({theme}) => theme.backgrounds.secondary};
  color: ${({theme}) => theme.colors.text};
  min-height: 25rem;
  min-width: 40rem;
  padding: 2em;
  border-radius: 6px;
  flex-direction: column;

  a {
    margin-top: auto;
    height: 45px;
    font-size: 0.95rem;
  }

  h2 {
    margin: 1em 0 0 0;
  }
`

const ResultHeader = styled.h1`
  text-align: center;
`

const StatsContainer = styled.div`
  display: relative;
  padding: 1em;
  border-radius: 6px;
  background: ${({theme}) => theme.backgrounds.secondary};
  color: ${({theme}) => theme.colors.text};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 1em;
  z-index: 0;
  margin-bottom: 1em;

  ${ResultsNumber} {
    color: ${({color}) => (color ? color : `${colors.p300}`)};
  }
`

const RaceResult: FC<RaceResultProps> = ({
  raceOver,
  playerId,
  playerColor,
  positions,
}) => {
  const [position, setPosition] = useState(
    positionToObj[positions.findIndex(player => player.id === playerId) + 1],
  )
  const {RaceStore} = useStore()
  return (
    <AnimatePresence>
      {raceOver && (
        <ResultContainer
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 2}}
          exit={{opacity: 0}}
        >
          <ResultHeader>
            <i>{position.tag}</i> <br />
            You placed {position.name}!
          </ResultHeader>
          <ol>
            {positions.map((player: any, idx) => (
              <li style={{fontSize: `1.${6 - idx}rem`}} key={player.id}>
                <span
                  style={{
                    color: player.color && player.color,
                  }}
                >
                  {player.name}
                  {player.id === playerId && ' (you)'}
                </span>
              </li>
            ))}
          </ol>
          <h2>Your Stats:</h2>
          <StatsContainer color={playerColor}>
            <div>
              <ResultsHeader>cpm (raw)</ResultsHeader>
              <ResultsNumber>{RaceStore.rawCpm}</ResultsNumber>
            </div>
            <div>
              <ResultsHeader>cpm (corrected)</ResultsHeader>
              <ResultsNumber>{RaceStore.cpm}</ResultsNumber>
            </div>
            <div>
              <ResultsHeader>wpm</ResultsHeader>
              <ResultsNumber>{RaceStore.wpm}</ResultsNumber>
            </div>
            <div>
              <ResultsHeader>correct</ResultsHeader>
              <ResultsNumber>{RaceStore.correct}</ResultsNumber>
            </div>
            <div>
              <ResultsHeader>incorrect</ResultsHeader>
              <ResultsNumber>{RaceStore.incorrect}</ResultsNumber>
            </div>
            <div>
              <ResultsHeader>corrections</ResultsHeader>
              <ResultsNumber>{RaceStore.corrections}</ResultsNumber>
            </div>
          </StatsContainer>
          <Button
            appearance="primary"
            intent="none"
            as={Link}
            to="/multiplayer"
          >
            Back to Lobbies
          </Button>
        </ResultContainer>
      )}
    </AnimatePresence>
  )
}

export default RaceResult
