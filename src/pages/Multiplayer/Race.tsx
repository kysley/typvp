import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useParams, useLocation} from 'react-router-dom'

import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'
import {RaceTypingArea, RacePosition, RaceMeta} from '@/components/Race'
import {TLobby} from '@/types/game'
import {SingleplayerContainer} from '@/styled/Singleplayer'

function genGuestIdAndName() {
  const id = Math.random()
    .toString(36)
    .substring(2, 15)
  const name = `Guest_${id.substring(0, 3)}`

  return {
    id,
    name,
    done: true,
  }
}

const Race = observer(() => {
  const {id: lobbyId} = useParams()
  const location = useLocation()
  const {UserStore, RaceStore} = useStore()
  const [id, setId] = useState<{
    id: string | number
    name: string
    done: boolean
  }>(location.state && location.state.id)
  const [sendData, setSendData] = useState(false)

  // Emit local cpm & reset sendData
  const sendRaceProgress = () => {
    socket.emit('race_progress', {wpm: RaceStore.derivewpm})
    setSendData(false)
  }

  useEffect(() => {
    if (!UserStore.fetchingUser) {
      if (UserStore.me) {
        console.log('hit1')
        setId({
          id: UserStore.me.id,
          name: UserStore.me.username,
          done: true,
        })
      } else if (!UserStore.me && !id) {
        console.log('hit2')
        const {id, name, done} = genGuestIdAndName()
        setId({id, name, done})
      }
    }
  }, [UserStore.fetchingUser, UserStore.me])

  useEffect(() => {
    socket.on('update', (payload: TLobby) => {
      console.log(payload)
      RaceStore.loadRoom(payload)
    })

    socket.on('race_send-wordList', (payload: string) => {
      RaceStore.loadWordSet(payload)
    })

    // Workaround for stale closures
    // May be unnecessary when cpm is stored in mobx
    socket.on('race_request-progress', (snapshot: TLobby) => {
      RaceStore.loadRoom(snapshot)
      setSendData(true)
    })
    return () => {
      socket.emit('race_leave')
      RaceStore.reset()
    }
  }, [])

  useEffect(() => {
    if (id && lobbyId && !RaceStore.room && id.done) {
      socket.emit('race_join-lobby', {id: id.id, name: id.name, lobbyId})
    }
  }, [id])

  useEffect(() => {
    if (RaceStore.room && sendData) {
      sendRaceProgress()
    }
  }, [sendData])

  return (
    <>
      {RaceStore.room && id ? (
        <>
          <RacePosition id={id.id} />
          <SingleplayerContainer>
            <RaceMeta />
            <RaceTypingArea canType={RaceStore.room.state === 'IN_PROGRESS'} />
          </SingleplayerContainer>
        </>
      ) : (
        'waiting...?'
      )}
    </>
  )
})

export default Race
