import React, {useEffect, useState} from 'react'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'

const Race = () => {
  const {UserStore} = useStore()
  const [id, setId] = useState(
    (UserStore.me && UserStore.me.id) ||
      Math.random()
        .toString(36)
        .substring(2, 15),
  )
  const [room, setRoom] = useState()
  const [cpm, setCpm] = useState(0)
  const [sendData, setSendData] = useState(false)

  // Emit local cpm & reset sendData
  const sendRaceProgress = () => {
    socket.emit('race_progress', {cpm})
    setSendData(false)
  }

  useEffect(() => {
    if (!room) {
      socket.emit('race_queue', {id})
    }
    socket.on('update', payload => {
      console.log(payload)
      setRoom(payload)
    })

    // Workaround for stale closures
    // May be unnecessary when cpm is stored in mobx
    socket.on('race_request-progress', snapshot => {
      setRoom(snapshot)
      setSendData(true)
    })
    return () => {
      socket.removeAllListeners()
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (room && sendData) {
      sendRaceProgress()
    }
  }, [sendData])

  return (
    <div style={{color: 'white'}}>
      {room && (
        <div>
          <h1>countdown: {room.countdown}</h1>
          <h1>remaining: {room.secondsRemaining}</h1>
          {Object.keys(room.players).map(key => (
            <h2 key={key}>{room.players[key]}</h2>
          ))}
          {room.state}
          <input onChange={e => setCpm(e.target.value.length)} />
        </div>
      )}
    </div>
  )
}

export default Race
