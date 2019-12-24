import React, {useState, useEffect} from 'react'
import {useQuery} from 'urql'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'

import {LOBBIES} from '@/graphql/queries/race'
import {PageHeader} from '@/styled/Theme'
import Button from '@/styled/Button'
import {TLobby} from '@/types/game'
import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'

function genGuestIdAndName() {
  const id = Math.random()
    .toString(36)
    .substring(2, 15)
  const name = `Guest_${id.substring(0, 3)}`

  return {
    id,
    name,
  }
}

const Lobbies = observer(() => {
  const {UserStore, RaceStore} = useStore()
  const [lobbies, setLobbies] = useState([])
  const history = useHistory()
  const [result] = useQuery({
    query: LOBBIES,
    requestPolicy: 'network-only',
    pollInterval: 5000,
  })
  const [id, setId] = useState<{id: string | number; name: string}>(
    genGuestIdAndName(),
  )

  useEffect(() => {
    if (!UserStore.fetchingUser) {
      if (UserStore.me && !RaceStore.room) {
        console.log('hit1')
        setId({
          id: UserStore.me.id,
          name: UserStore.me.username,
        })
      } else if (!UserStore.me && !RaceStore.room) {
        console.log('hit2')
        const {id, name} = genGuestIdAndName()
        setId({id, name})
      }
    }
  }, [UserStore.fetchingUser, UserStore.me])

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {lobbies},
      } = result
      setLobbies(lobbies)
    }
  }, [result])

  useEffect(() => {
    socket.on('update', (payload: TLobby) => {
      console.log(payload)
      RaceStore.loadRoom(payload)
      history.push(`/multiplayer/${payload.id}`, {id})
    })
  }, [])

  const joinLobby = (e: any, lobbyId: string) => {
    e.preventDefault()
    socket.emit('race_join-lobby', {id: id.id, name: id.name, lobbyId})
  }

  const quickPlay = (e: any) => {
    e.preventDefault()
    socket.emit('race_queue', {id: id.id, name: id.name})
  }

  return (
    <>
      <PageHeader>Lobbies</PageHeader>
      <Button intent="none" appearance="default" onClick={e => quickPlay(e)}>
        Quick Play
      </Button>
      {lobbies.map((lobby: TLobby, idx) => (
        <div key={lobby.id}>
          <p>Lobby {(idx += 1)}</p>
          <p>
            {5 - lobby.players.length} spots left ({lobby.players.length} / 5)
          </p>
          <Button
            intent="none"
            appearance="default"
            disabled={lobby.players.length === 5 || lobby.state !== 'WAITING'}
            onClick={e => joinLobby(e, lobby.id)}
          >
            Join Lobby
          </Button>
        </div>
      ))}
    </>
  )
})

export default Lobbies
