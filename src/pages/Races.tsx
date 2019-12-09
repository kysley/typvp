import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'
import RaceTypingArea from '@/components/Multiplayer/RaceTypingArea'
import {TRoom} from '@/types/game'
import RacePosition from '@/components/Multiplayer/RacePosition'

const Race = observer(() => {
  const {UserStore, RaceStore} = useStore()
  const [id, setId] = useState(
    (UserStore.me && UserStore.me.id) ||
      Math.random()
        .toString(36)
        .substring(2, 15),
  )
  // const [room, setRoom] = useState()
  // const [cpm, setCpm] = useState(0)
  const [sendData, setSendData] = useState(false)

  // Emit local cpm & reset sendData
  const sendRaceProgress = () => {
    console.log(`wpm for this second: ${RaceStore.derivewpm}`)
    socket.emit('race_progress', {wpm: RaceStore.derivewpm})
    setSendData(false)
  }

  useEffect(() => {
    if (!RaceStore.room) {
      socket.emit('race_queue', {id})
    }
    socket.on('update', (payload: TRoom) => {
      console.log(payload)
      // setRoom(payload)
      RaceStore.loadRoom(payload)
    })

    socket.on('race_send-wordList', (payload: string) => {
      RaceStore.loadWordSet(payload)
    })

    // Workaround for stale closures
    // May be unnecessary when cpm is stored in mobx
    socket.on('race_request-progress', (snapshot: TRoom) => {
      // setRoom(snapshot)
      RaceStore.loadRoom(snapshot)
      setSendData(true)
    })
    return () => {
      socket.removeAllListeners()
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (RaceStore.room && sendData) {
      sendRaceProgress()
    }
  }, [sendData])

  return (
    <div style={{color: 'white'}}>
      {RaceStore.room ? (
        <div>
          <RacePosition />
          <h1>countdown: {RaceStore.room.countdown}</h1>
          <h1>remaining: {RaceStore.room.secondsRemaining}</h1>
          {Object.keys(RaceStore.room.players).map(key => (
            <h2 key={key}>{RaceStore.room!.players[key]}</h2>
          ))}
          {RaceStore.room.state}
          <RaceTypingArea isGameOver={false} />
        </div>
      ) : (
        'in queue'
      )}
    </div>
  )
})

export default Race
