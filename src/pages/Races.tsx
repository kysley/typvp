import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8086')

const Race = () => {
  const [room, setRoom] = useState(null)
  useEffect(() => {
    if (!room) {
      socket.emit('race-find-lobby', {id: 'test'})
    }
    socket.on('race-join-lobby', payload => {
      console.log(payload)
    })
  }, [])

  return <span>hey</span>
}

export default Race
