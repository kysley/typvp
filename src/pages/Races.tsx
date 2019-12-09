import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'
import RaceTypingArea from '@/components/Multiplayer/RaceTypingArea'
import {TRoom} from '@/types/game'
import RacePosition from '@/components/Multiplayer/RacePosition'
import RaceMeta from '@/components/Multiplayer/RaceMeta'
import {SingleplayerContainer} from '@/styled/Singleplayer'

const Race = observer(() => {
  const {UserStore, RaceStore} = useStore()
  const [id, setId] = useState(
    (UserStore.me && UserStore.me.id) ||
      Math.random()
        .toString(36)
        .substring(2, 15),
  )
  const [sendData, setSendData] = useState(false)

  // Emit local cpm & reset sendData
  const sendRaceProgress = () => {
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
    <>
      {RaceStore.room ? (
        <>
          <RacePosition id={id} />
          <SingleplayerContainer>
            <RaceMeta />
            <RaceTypingArea canType={RaceStore.room.state === 'in-progress'} />
          </SingleplayerContainer>
        </>
      ) : (
        'in queue'
      )}
    </>
  )
})

export default Race
