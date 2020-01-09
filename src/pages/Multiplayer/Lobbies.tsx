import React, {useState, useEffect} from 'react'
import {useQuery} from 'urql'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

import {LOBBIES} from '@/graphql/queries/race'
import {PageHeader} from '@/styled/Theme'
import Button from '@/styled/Button'
import {TLobby} from '@/types/game'
import {useStore} from '@/stores'
import {socket} from '@/helpers/socket'
import {UsersIcon, StopwatchIcon, DeviceIcon} from '@/components/icons'

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
  const [id, setId] = useState<{
    id: string | number
    name: string
  }>(genGuestIdAndName())

  useEffect(() => {
    if (!UserStore.fetchingUser) {
      if (UserStore.me && !RaceStore.room) {
        console.log('hit1')
        setId({
          id: UserStore.me.id,
          name: UserStore.me.username,
        })
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
    socket.once('queue_result', (payload: any) => {
      history.push(`/multiplayer/${payload.id}`, {id})
    })
  }, [])

  const joinLobby = (e: any, lobbyId: string) => {
    e.preventDefault()
    history.push(`/multiplayer/${lobbyId}`, {id})
  }

  const quickPlay = (e: any) => {
    e.preventDefault()
    socket.emit('race_queue', {id: id.id, name: id.name})
  }

  return (
    <>
      <PageHeader>Lobbies</PageHeader>
      <LobbiesContainer>
        <div>
          <Button
            intent="none"
            appearance="primary"
            onClick={e => quickPlay(e)}
          >
            Quick Play
          </Button>
        </div>
        {lobbies.map((lobby: TLobby, idx) => (
          <Lobby key={lobby.id}>
            <h3>Lobby {(idx += 1)}</h3>
            <div>
              <UsersIcon />
              <span>{lobby.players.length} / 5</span>
            </div>
            <div>
              <StopwatchIcon />
              <span>{lobby.secondsRemaining}</span>
            </div>
            <div>
              <DeviceIcon />
              <span>{lobby.state}</span>
            </div>
            <Button
              intent="none"
              appearance="default"
              disabled={lobby.players.length === 5 || lobby.state !== 'WAITING'}
              onClick={e => joinLobby(e, lobby.id)}
            >
              Join Lobby
            </Button>
          </Lobby>
        ))}
      </LobbiesContainer>
    </>
  )
})

export default Lobbies

export const LobbiesContainer = styled.section`
  display: grid;
  background: ${({theme}) => theme.backgrounds.secondary};
  color: ${({theme}) => theme.colors.text};
  padding: 1em;
  border-radius: 6px;
  width: 50%;
  align-self: center;
  grid-row-gap: 0.5em;
  grid-template-rows: 1fr;
`

export const Lobby = styled.div`
  display: grid;
  background: ${({theme}) => theme.backgrounds.primary};
  border-radius: 4px;
  padding: 1em;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;

  svg {
    margin-right: 0.5em;
  }

  h3 {
    margin: 0;
  }

  div {
    display: flex;
    align-items: center;
    grid-row: 2;
  }

  button {
    grid-row: 1 / span 2;
    height: 100%;
  }
`
