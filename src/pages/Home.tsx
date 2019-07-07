import * as React from 'react'
import randomwords from 'random-words'

import Word from '@/components/Word'
// import ResultDialog from './ResultDialog'

const words = randomwords(250)

enum TypingState {
  NotStarted,
  InProgress,
  AwaitingLastWord,
  Finished,
}

interface TypeState {
  inputWords: string[]
  i: number
  time: number
  typingState: TypingState
}

class Type extends React.Component<{}, TypeState> {
  state = {
    inputWords: [''],
    i: 0,
    time: 0,
    typingState: TypingState.NotStarted,
  }

  componentDidMount() {
    // this.inputRef.current!.focus()
  }

  // inputRef: React.RefObject<HTMLInputElement> = React.createRef()
  wordsRef: React.RefObject<HTMLDivElement> = React.createRef()

  cpm = 0

  getCpm(): number {
    let timeElapsed = this.state.time

    const characters = this.state.inputWords
      .map(word => word.length)
      .reduce((a, b) => a + b + 1, 0)

    return Math.floor((characters * 60) / timeElapsed)
  }

  runTimer = () => {
    setTimeout(() => {
      let time = this.state.time
      if (time < 60) {
        this.setState({time: time + 1})
        this.runTimer()
      } else {
        this.endTimer()
      }
    }, 1000)
  }

  endTimer = () => {
    this.setState({typingState: TypingState.AwaitingLastWord})
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let inputWords: string[] = this.state.inputWords
    let i: number = this.state.i

    if (e.key === 'Backspace') {
      if (inputWords[i].length === 0 || e.ctrlKey) {
        if (i > 0) i--
        inputWords = inputWords.slice(0, i + 1)
      } else inputWords[i] = inputWords[i].slice(0, inputWords[i].length - 1)
    } else if (e.key === ' ') {
      i++
      inputWords[i] = ''
      this.cpm = this.getCpm()
      if (this.state.typingState === TypingState.AwaitingLastWord)
        this.setState({typingState: TypingState.Finished})
    } else if (e.key.length === 1) {
      inputWords[i] += e.key
      if (this.state.typingState === TypingState.NotStarted) {
        this.setState({typingState: TypingState.InProgress})
        this.runTimer()
      }
    }

    ;(this.wordsRef.current as HTMLDivElement).children[i].scrollIntoView(true)

    this.setState({inputWords, i})
  }

  getWordType = (a: number, b: number) => {
    if (a < b) return 'done'
    if (a === b) return 'current'
    return 'awaiting'
  }

  reset = () => {
    window.location.reload()
  }

  closeDialog = (e: any) => this.reset()

  public render() {
    const current = this.state.inputWords[this.state.i]
    let time = 60 - this.state.time
    if (this.state.typingState === TypingState.NotStarted) time = 60

    return (
      <div style={{maxWidth: '750px', width: '90%', margin: '10px auto'}}>
        <div>
          Time Left:{' '}
          {this.state.typingState === TypingState.AwaitingLastWord
            ? 'finish word'
            : `${time}s`}
        </div>
        <div style={{marginLeft: 20}}>
          CPM: {this.cpm === Infinity || this.cpm === NaN ? '?' : this.cpm}
        </div>
        <div style={{flexGrow: 1}} />
        {/* <IconButton color="inherit" onClick={this.reset}>
                  <i className="material-icons">replay</i>
                </IconButton> */}
        <div style={{padding: '35px 15px'}}>
          <div
            ref={this.wordsRef}
            style={{height: '150px', overflow: 'hidden'}}
          >
            {words.map((word, i) => (
              <Word
                key={i}
                expected={word}
                actual={this.state.inputWords[i]}
                variant={this.getWordType(i, this.state.inputWords.length - 1)}
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
            onKeyDown={e => this.onKeyDown(e)}
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
  }
}

export default Type
