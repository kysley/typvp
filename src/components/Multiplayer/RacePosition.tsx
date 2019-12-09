import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'

import {useStore} from '@/stores'

const RacePosition: FC = observer(() => {
  const {RaceStore} = useStore()
  return (
    <div>
      {RaceStore.positions.map((pos: number, idx: number) => {
        return (
          <div
            style={{
              background: 'black',
              width: `${(pos / RaceStore.fastestPlayer) * 100}%`,
              marginBottom: '1em',
            }}
            key={`pos-${idx}`}
          >
            {pos}
          </div>
        )
      })}
    </div>
  )
})

export default RacePosition
