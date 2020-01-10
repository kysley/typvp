import React, {FC, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

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

// function findMyPosition(element, playerId) {
//   return element.id === playerId
// }

const RaceResult: FC<RaceResultProps> = ({raceOver, playerId, positions}) => {
  const [position, setPosition] = useState()
  useEffect(() => {
    const pos = positions.findIndex(player => player.id === playerId) + 1
    setPosition(positionToString[pos])
  }, [raceOver])
  // const myPosition = positions.findIndex(player => player.id === playerId) + 1
  console.log(position)
  return (
    <AnimatePresence>
      {raceOver && (
        <motion.div
          animate={{opacity: [0, 1]}}
          initial
          transition={{duration: 0.425}}
          exit={{opacity: 0}}
        >
          {position}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RaceResult
