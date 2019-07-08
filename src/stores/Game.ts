import {observable, action} from 'mobx'
import randomwords from 'random-words'

import {TypingState} from '@/types/game'

class GameStore {
  @observable
  typedHistory: string[] = new Array(250).fill('')

  @observable
  typedWord: string = ''

  @observable
  wordIndex: number = 0

  @observable
  time: number = 60

  @observable
  typingState: TypingState = TypingState.NotStarted

  @observable
  cpm: number = 0

  @observable
  wpm: number = 0

  @observable
  words: string[] = []

  @action
  calculateCpm(): any {
    const characters = this.typedHistory
      .map(word => word.length)
      .reduce((a, b) => a + b + 1, 0)

    this.cpm = Math.floor((characters * 60) / this.time)
    return Math.floor((characters * 60) / this.time)
  }

  @action
  generateWords = () => {
    this.words = randomwords(250)
  }

  @action
  endTimer = () => {
    this.typingState = TypingState.AwaitingLastWord
  }

  @action
  runTimer = (): void => {
    setTimeout(() => {
      const {time} = this
      if (time > 0) {
        this.time--
        this.runTimer()
      } else {
        this.endTimer()
      }
    }, 1000)
  }

  @action
  onKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let {inputWords, i, typingState} = this

    // if (e.key === 'Backspace') {
    //   if (this.inputWords[this.i].length === 0 || e.ctrlKey) {
    //     if (this.i > 0) this.i--
    //     this.inputWords = this.inputWords.slice(0, this.i + 1)
    //   } else {
    //     this.inputWords[this.i] = this.inputWords[this.i].slice(
    //       0,
    //       this.inputWords[this.i].length - 1,
    //     )
    //   }
    // } else if (e.key === ' ') {
    if (this.typingState === TypingState.NotStarted) {
      this.typingState = TypingState.InProgress
      this.runTimer()
    }
    if (e.target.value !== ' ') {
      this.typedWord = e.target.value
    }
    // if (e.key === ' ') {
    //   this.i++
    //   this.inputWords[this.i] = ''
    //   this.calculateCpm()
    //   if (this.typingState === TypingState.AwaitingLastWord) {
    //     this.typingState = TypingState.Finished
    //   }
    // // }
    // } else if (e.key.length === 1) {
    //   this.inputWords[this.i] += e.key
    //   if (this.typingState === TypingState.NotStarted) {
    //     this.typingState = TypingState.InProgress
    //     this.runTimer()
    //   }
    // }

    // this.inputWords = inputWords
    // this.i = i
  }

  @action
  testWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.typedHistory[this.wordIndex] = this.typedWord
    this.typedWord = ''
    this.wordIndex++
    this.calculateCpm()

    if (this.typingState === TypingState.AwaitingLastWord) {
      this.typingState = TypingState.Finished
    }
  }
}

export default new GameStore()
