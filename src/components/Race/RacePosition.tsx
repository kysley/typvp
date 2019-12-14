import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF']

const RacePosition: FC = observer(({id}: any) => {
  const {RaceStore} = useStore()

  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        maxWidth: '900px',
        width: '900px',
      }}
    >
      <ul
        style={{
          width: `${100 - (RaceStore.room!.secondsRemaining / 60) * 100}%`,
          listStyle: 'none',
          padding: 0,
          transition: '1.1s all linear',
        }}
      >
        {RaceStore.room!.players.map((player: any, idx: any) => (
          <li
            style={{
              height: '32px',
              background: `${colors[idx]}`,
              width: `${(player.wpm / RaceStore.fastestPlayer) * 100}%`,
              marginBottom: '1em',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '1em',
              color: 'white',
              borderRadius: '4px',
              transition: '1.1s all linear',
            }}
            key={player.id}
          >
            <span>
              {' '}
              {player.wpm}
              {player.id === id && ' (you)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default RacePosition
