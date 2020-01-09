import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import styled from 'styled-components'

import {useStore} from '@/stores'

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF']

const PlayerContainer = styled.div`
  display: flex;
  align-self: center;
  max-width: 900px;
  width: 900px;
  position: absolute;
  top: calc(31vh + 245px);
  height: 176px;

  @media screen and (min-height: 930px) {
    top: 11vh;
  }
`

const PlayerList = styled.ul`
  transition: 1.1s all linear;
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 1;
  display: flex;
  flex-direction: column;

  @media screen and (min-height: 930px) {
    flex-direction: column-reverse;
  }
`

const PlayerBar = styled.li`
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 1em;
  color: ${({theme}) => theme.colors.text};
  border-radius: 4px;
  transition: 1.1s width linear;
  position: relative;

  :not(:first-of-type) {
    margin-bottom: 1em;
  }

  @media screen and (min-height: 930px) {
    :not(:last-of-type) {
      margin-bottom: 1em;
    }
  }

  ::after {
    content: '';
    display: block;
    width: 900px;
    position: absolute;
    height: 32px;
    top: 0;
    left: 0;
    border-radius: 4px;
    background: ${({theme}) => theme.backgrounds.secondary};
    z-index: -1;
  }

  span {
    min-width: 300px;
  }
`

const RacePosition: FC<{playerId: string | number}> = observer(({playerId}) => {
  const {RaceStore} = useStore()

  return (
    <PlayerContainer>
      <PlayerList
        style={{
          width: `${100 - (RaceStore.room!.secondsRemaining / 60) * 100}%`,
        }}
      >
        {RaceStore.room!.players.map((player: any, idx: any) => (
          <PlayerBar
            style={{
              background: `${colors[idx]}`,
              width: `${(player.wpm / RaceStore.fastestPlayer) * 100}%`,
            }}
            key={player.id}
          >
            <span>
              {player.wpm} -
              {player.id === playerId
                ? ` ${player.name} (you)`
                : ` ${player.name}`}
            </span>
          </PlayerBar>
        ))}
      </PlayerList>
    </PlayerContainer>
  )
})

export default RacePosition
