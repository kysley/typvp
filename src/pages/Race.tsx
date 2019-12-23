import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'
import {RaceTypingArea, RacePosition, RaceMeta} from '@/components/Race'
import {TRoom} from '@/types/game'
import {SingleplayerContainer} from '@/styled/Singleplayer'
import Button from '@/styled/Button'

function getGuestIdAndName() {
  const id = Math.random()
    .toString(36)
    .substring(2, 15)
  const name = `Guest_${id.substring(0, 3)}`

  return {
    id,
    name,
  }
}

const Race = observer(() => {
  const {UserStore, RaceStore} = useStore()
  const [id, setId] = useState()
  const [sendData, setSendData] = useState(false)

  // Emit local cpm & reset sendData
  const sendRaceProgress = () => {
    socket.emit('race_progress', {wpm: RaceStore.derivewpm})
    setSendData(false)
  }

  const queue = () => {
    socket.emit('race_queue', {id: id.id, name: id.name})
  }

  useEffect(() => {
    if (!UserStore.fetchingUser) {
      if (UserStore.me && !RaceStore.room && !id) {
        console.log('hit1')
        setId({
          id: UserStore.me.id,
          name: UserStore.me.username,
        })
        socket.emit('race_queue', {
          id: UserStore.me.id,
          name: UserStore.me.username,
        })
      } else if (!UserStore.me && !RaceStore.room) {
        console.log('hit2')
        const {id, name} = getGuestIdAndName()
        setId({id, name})
        socket.emit('race_queue', {
          id,
          name,
        })
      }
    }
  }, [UserStore.fetchingUser, UserStore.me])

  useEffect(() => {
    socket.on('update', (payload: TRoom) => {
      console.log(payload)
      RaceStore.loadRoom(payload)
    })

    socket.on('race_send-wordList', (payload: string) => {
      RaceStore.loadWordSet(payload)
    })

    // Workaround for stale closures
    // May be unnecessary when cpm is stored in mobx
    socket.on('race_request-progress', (snapshot: TRoom) => {
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
          <RacePosition id={id.id} />
          <SingleplayerContainer>
            <RaceMeta />
            <RaceTypingArea canType={RaceStore.room.state === 'IN_PROGRESS'} />
          </SingleplayerContainer>
        </>
      ) : (
        <Button appearance="default" intent="none" onClick={queue}>
          Queue
        </Button>
      )}
    </>
  )
})

export default Race
