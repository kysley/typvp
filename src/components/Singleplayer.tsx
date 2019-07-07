import React, {FC, useEffect, useState, useRef} from 'react'
import {observer} from 'mobx-react'

import {TypingState} from '@/types/game'
import {useStore} from '@/stores'
import Word from '@/components/Word'

const getWordType = (a: number, b: number) => {
  if (a < b) return 'done'
  if (a === b) return 'current'
  return 'awaiting'
}

const Singleplayer: FC = observer((props: any) => {
  const wordsRef = useRef(null)
  const [current, setCurrent] = useState('')

  const {GameStore} = useStore()

  useEffect(() => {
    GameStore.generateWords()
  }, [])

  useEffect(() => {
    setCurrent(GameStore.inputWords[GameStore.i])
  }, [GameStore.i, GameStore.inputWords])

  return (
    <div style={{maxWidth: '750px', width: '90%', margin: '10px auto'}}>
      <div>
        Time Left:{' '}
        {GameStore.typingState === TypingState.AwaitingLastWord
          ? 'finish word'
          : `${GameStore.time}s`}
      </div>
      <div style={{marginLeft: 20}}>
        CPM:{' '}
        {GameStore.cpm === Infinity || GameStore.cpm === NaN
          ? '?'
          : GameStore.cpm}
      </div>
      <div style={{flexGrow: 1}} />
      {/* <IconButton color="inherit" onClick={this.reset}>
                  <i className="material-icons">replay</i>
                </IconButton> */}
      <div style={{padding: '35px 15px'}}>
        <div ref={wordsRef} style={{height: '150px', overflow: 'hidden'}}>
          {GameStore.words.length > 0 &&
            GameStore.words.map((word: string, i: number) => (
              <Word
                key={`${word}-${i}`}
                expected={word}
                actual={GameStore.inputWords[i]}
                variant={getWordType(i, GameStore.inputWords.length - 1)}
              />
            ))}
        </div>
      </div>
      <div style={{padding: '0px'}}>
        <input
          // ref={this.inputRef}
          placeholder="Start typing here"
          // margin="none"
          // fullWidth={true}
          // variant="outlined"
          value={current}
          onKeyDown={e => GameStore.onKeyDown(e)}
        />
        {/* <ResultDialog
          open={this.state.typingState === TypingState.Finished}
          expected={words}
          actual={this.state.inputWords}
          closeDialog={this.closeDialog}
        /> */}
      </div>
    </div>
  )
})

export default Singleplayer
