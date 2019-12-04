import React, {useEffect, useState} from 'react'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'

let timeout: any = null

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

  useEffect(() => {
    if (!room) {
      socket.emit('race-matchmake', {id})
    }
    socket.on('update', payload => {
      console.log(payload)
      setRoom(payload)
    })

    socket.on('request-race-progress', snapshot => {
      setRoom(snapshot)
      socket.emit('race-progress', {cpm})
    })
    return () => {
      socket.removeAllListeners()
      socket.close()
    }
  }, [])

  useEffect(() => {
    // if (room) {
    //   if (room.state === 'in-progress') {
    //     // if (room.acceptUpdates) {
    //     //   // timeout = setTimeout(() => {
    //     //   socket.emit('race-progress', {cpm})
    //     //   // }, 1000)
    //     // }
    //   } else if (room.state === 'finished') {
    //     clearTimeout(timeout)
    //   }
    //   if (room.acceptUpdates === false) {
    //     clearTimeout(timeout)
    //   }
    // }
  }, [room])

  return (
    <div>
      {room && (
        <div>
          <h1>countdown: {room.countdown}</h1>
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
