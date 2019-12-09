import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF']

const RacePosition: FC = observer(({id}: any) => {
  const {RaceStore} = useStore()

  return (
    <div>
      <ul style={{width: '250px', listStyle: 'none'}}>
        {RaceStore.room!.players.map((player: any, idx: any) => (
          <li
            style={{
              height: '32px',
              background: `${colors[idx]}`,
              width: `${(player.wpm / RaceStore.fastestPlayer) * 100}%`,
              marginBottom: '1em',
            }}
            key={player.id}
          >
            <span>
              {' '}
              {player.wpm}
              {player.id === id && ' me'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default RacePosition
